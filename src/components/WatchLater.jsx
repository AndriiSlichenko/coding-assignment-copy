import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import watchLaterSlice from '../data/watchLaterSlice';
import Movies from './Movies';

import '../styles/selected-movies.scss';

const WatchLater = () => {
    const dispatch = useDispatch();
    const watchLaterMovies = useSelector(state => state.watchLater.watchLaterMovies);
    const { removeAllWatchLater } = watchLaterSlice.actions;
    const handleRemoveAllWatchLater = useCallback(() => dispatch(removeAllWatchLater()), [dispatch, removeAllWatchLater]);

    return (
        <div className="selected-movies-wrapper" data-testid="watch-later-div">
            {watchLaterMovies.length ? (
                <div data-testid="watch-later-movies" className="selected-movies">
                    <h6 className="header">Watch Later List</h6>
                    <Movies movies={watchLaterMovies} />
                    <footer className="text-center">
                        <button className="btn btn-primary" onClick={handleRemoveAllWatchLater}>
                            Empty list
                        </button>
                    </footer>
                </div>
            ) : (
                <div className="text-center empty-cart">
                    <i className="bi bi-heart" />
                    <p>You have no movies saved to watch later.</p>
                    <p>Go to <Link to='/'>Home</Link></p>
                </div>
            )}
        </div>
    )
}

export default WatchLater
