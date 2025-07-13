import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import starredSlice from '../data/starredSlice';
import Movies from './Movies';

import '../styles/selected-movies.scss';

const Starred = () => {
    const dispatch = useDispatch();
    const starredMovies = useSelector(state => state.starred.starredMovies);
    const { clearAllStarred } = starredSlice.actions;
    const handleClearAllStarredMovies = useCallback(() => dispatch(clearAllStarred()), [clearAllStarred, dispatch]);

    return (
        <div className="selected-movies-wrapper" data-testid="starred">
            {starredMovies.length ? (
                <div data-testid="starred-movies" className="selected-movies">
                    <h6 className="header">Starred movies</h6>
                    <Movies movies={starredMovies} />
                    <footer className="text-center">
                        <button className="btn btn-primary" onClick={handleClearAllStarredMovies}>
                            Remove all starred
                        </button>
                    </footer>
                </div>
            ) : (
                <div className="text-center empty-cart">
                    <i className="bi bi-star" />
                    <p>There are no starred movies.</p>
                    <p>Go to <Link to='/'>Home</Link></p>
                </div>
            )}
        </div>
    )
}

export default Starred
