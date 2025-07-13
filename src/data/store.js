import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from './moviesSlice';
import starredSlice from './starredSlice';
import watchLaterSlice from './watchLaterSlice';
import viewTrailerSlice from './viewTrailerSlice';

const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        viewTrailer: viewTrailerSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
    },
})

export default store
