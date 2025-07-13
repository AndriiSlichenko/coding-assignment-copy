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

it('movies starred and saved to watch later', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
        expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const starMovieLink = screen.getAllByTestId('starred-link')[0]
    await waitFor(async () => {
        expect(starMovieLink).toBeInTheDocument()
        await starMovieLink.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    await waitFor(async () => {
        expect(screen.getByTestId('star-fill')).toBeInTheDocument()
    })
    await waitFor(async () => {
        expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
    })

    const watchLaterLink = screen.getAllByTestId('watch-later')[0]

    await waitFor(async () => {
        expect(watchLaterLink).toBeInTheDocument()
        await watchLaterLink.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    await waitFor(async () => {
        expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})

it('Open view trailer modal after click on watch trailer.', async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
        expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
    })

    const viewTrailerLink = screen.getAllByTestId('view-trailer')[0];
    
    await waitFor(async () => {
        expect(viewTrailerLink).toBeInTheDocument();
    })
    await userEvent.click(viewTrailerLink);

    await waitFor(async () => {
        expect(screen.getByTestId('modal-video')).toBeInTheDocument();
    });
})