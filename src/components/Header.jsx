import { useCallback, useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';

import '../styles/header.scss';

const DEBOUNCE_DELAY = 400;

const Header = ({ searchQuery, searchMovies }) => {
    const searchRef = useRef(null);
    const starredMovies = useSelector(state => state.starred.starredMovies);
    const totalStarredMovies = starredMovies.length;

    useEffect(() => {
        if (searchQuery === '') {
            searchRef.current.value = '';
        }
    }, [searchQuery, searchRef]);

    const backToHome = useCallback(() => {
        if (searchRef?.current?.value) {
            searchRef.current.value = '';
        }
        searchMovies('');
    }, [searchMovies, searchRef]);
    const handleSearchMovies = useDebounce(e => searchMovies(e.target.value), DEBOUNCE_DELAY);

    return (
        <header>
            <Link to="/" data-testid="home" onClick={backToHome}>
                <i className="bi bi-film" />
            </Link>
            <nav>
                <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
                    {totalStarredMovies ? (
                        <>
                            <i className="bi bi-star-fill bi-star-fill-white" />
                            <sup className="star-number">{totalStarredMovies}</sup>
                        </>
                    ) : (
                        <i className="bi bi-star" />
                    )}
                </NavLink>
                <NavLink to="/watch-later" className="nav-fav" data-testid="watch-later-link">
                    watch later
                </NavLink>
            </nav>
            <div className="input-group rounded">
                <input
                    type="search"
                    ref={searchRef}
                    data-testid="search-movies"
                    onChange={handleSearchMovies}
                    className="form-control rounded"
                    placeholder="Search movies..."
                    aria-label="Search movies"
                    aria-describedby="search-addon"
                />
            </div>
        </header>
    )
}

export default Header
