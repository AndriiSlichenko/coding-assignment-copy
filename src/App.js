import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import Modal from './components/Modal';
import moviesSLice from './data/moviesSlice';
import { useFetchMovies } from "./hooks/useFetchMovies";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { scrollToTop } from './utils';

import './app.scss';

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const movies = useSelector(state => state.movies.movies);
    const fetchStatus = useSelector(state => state.movies.fetchStatus);
    const totalPages = useSelector(state => state.movies.totalPages);
    const openViewTrailerModal = useSelector(state => state.viewTrailer.openViewTrailerModal);
    const { resetMovies } = moviesSLice.actions;
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') ?? '';
    const [page, setPage] = useState(1);
    const incrementPage = useCallback(() => setPage(prevPage => prevPage + 1), []);
    const hasMore = page < totalPages;
    const lastMovieRef = useInfiniteScroll(hasMore, fetchStatus === 'loading', incrementPage);
    const disableFetch = location?.pathname !== '/';

    useEffect(() => {
        if (disableFetch) {
            setPage(1);
            dispatch(resetMovies());
        }
    }, [disableFetch, dispatch, resetMovies])

    useFetchMovies(searchQuery, page, disableFetch);

    const searchMovies = useCallback(query => {
        scrollToTop();
        navigate('/');
        setPage(1);
        const params = query !== '' ? createSearchParams({ search: query }) : '';
        setSearchParams(params);
    }, [navigate, setSearchParams]);

    return (
        <div className="app">
            <Header searchQuery={searchQuery} searchMovies={searchMovies} />
            {openViewTrailerModal && <Modal />}
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Movies movies={movies} lastMovieRef={lastMovieRef} />} />
                    <Route path="/starred" element={<Starred />} />
                    <Route path="/watch-later" element={<WatchLater />} />
                    <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
