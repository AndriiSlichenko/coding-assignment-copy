import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import moviesSlice from '../data/moviesSlice'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import viewTrailerSlice from '../data/viewTrailerSlice';

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = configureStore({
            reducer: {
                movies: moviesSlice.reducer,
                viewTrailer: viewTrailerSlice.reducer,
                starred: starredSlice.reducer,
                watchLater: watchLaterSlice.reducer,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    setupListeners(store.dispatch)

    function wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper, ...renderOptions }) };
}