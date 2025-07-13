import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    it('should set loading true while action is pending', () => {
        const action = { type: fetchMovies.pending };
        const result = moviesSlice.reducer({ fetchStatus: '' }, action);
        expect(result).toEqual({ fetchStatus: 'loading' })
    })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled,
            payload: { results: moviesMock }
        };
        const result = moviesSlice.reducer({ movies: [], fetchStatus: '' }, action);
        expect(result).toEqual({ fetchStatus: 'success', movies: moviesMock });
    })

    it('should set error when action is rejected', () => {
        const action = { type: fetchMovies.rejected };
        const result = moviesSlice.reducer({ movies: [], fetchStatus: '' }, action);
        expect(result).toEqual({ movies: [], fetchStatus: 'error' })
    })
})