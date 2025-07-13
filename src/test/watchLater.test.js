import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

beforeEach(() => {
    global.IntersectionObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
    window.scrollTo = jest.fn();
});

it('Watch Later movies page added', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
        expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)

    const watchLaterPageLink = screen.getByTestId('watch-later-link');
    await userEvent.click(watchLaterPageLink)

    const watchLaterLinkAdded = screen.getAllByTestId('remove-watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLinkAdded).toBeInTheDocument()
    })
})