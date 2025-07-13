import { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';
import { fetchTrailer } from '../data/viewTrailerSlice';
import placeholder from '../assets/not-found-500X750.jpeg';
import { API_KEY, ENDPOINT } from '../constants';

const Movie = memo(({ movie, isStarred, isWatchLater, lastMovieRef }) => {
    const dispatch = useDispatch();
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    const { id, overview, release_date, poster_path, title } = movie;
    const shortenedReleaseDate = release_date?.substring(0, 4);
    const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : placeholder;

    const addToFavorite = useCallback(async () => {
        dispatch(starMovie({
            id,
            overview,
            release_date: shortenedReleaseDate,
            poster_path,
            title
        }));
    }, [dispatch, id, overview, poster_path, shortenedReleaseDate, starMovie, title])

    const removeFromFavorite = useCallback(() => {
        dispatch(unstarMovie(movie));
    }, [dispatch, movie, unstarMovie])

    const handleViewTrailer = useCallback(() => {
        const url = `${ENDPOINT}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`;
        dispatch(fetchTrailer(url));
    }, [dispatch, movie.id])

    const handleAddToWatchLater = useCallback(() => {
        dispatch(addToWatchLater({
            id,
            overview,
            release_date: shortenedReleaseDate,
            poster_path,
            title,
        }));
    }, [addToWatchLater, dispatch, id, overview, poster_path, shortenedReleaseDate, title])

    const handleRemoveFromWatchLater = useCallback(e => {
        e.stopPropagation();
        dispatch(removeFromWatchLater(movie));
    }, [dispatch, movie, removeFromWatchLater])

    const handleStopPropagation = useCallback(e => e.stopPropagation(), []);

    const handleToggleCard = useCallback(e => {
        const targetClassList = e.currentTarget.classList;
        if (targetClassList.contains("opened")) {
            targetClassList.remove('opened')
        } else {
            targetClassList.add('opened');
        }
    }, []);

    return (
        <div className="movie-wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2" ref={lastMovieRef}>
            <div className="card" onClick={handleToggleCard}>
                <div className="card-body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">{overview}</div>
                        <div className="year">{shortenedReleaseDate}</div>
                        <div onClick={handleStopPropagation}>
                            {!isStarred ? (
                                <span
                                    role="button"
                                    className="btn-star"
                                    data-testid="starred-link"
                                    onClick={addToFavorite}
                                >
                                    <i className="bi bi-star" />
                                </span>
                            ) : (
                                <span
                                    className="btn-star"
                                    data-testid="unstar-link"
                                    onClick={removeFromFavorite}
                                >
                                    <i className="bi bi-star-fill" data-testid="star-fill" />
                                </span>
                            )}
                            {!isWatchLater ? (
                                <button
                                    type="button"
                                    data-testid="watch-later"
                                    className="btn btn-light btn-watch-later"
                                    onClick={handleAddToWatchLater}
                                >
                                    Watch Later
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    data-testid="remove-watch-later"
                                    className="btn btn-light btn-watch-later blue"
                                    onClick={handleRemoveFromWatchLater}
                                >
                                    <i className="bi bi-check"></i>
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-dark"
                                data-testid="view-trailer"
                                onClick={handleViewTrailer}
                            >
                                View Trailer
                            </button>
                        </div>
                    </div>
                    <img className="center-block" src={posterUrl} alt="Movie poster" />
                </div>
                <h6 className="title">{title}</h6>
            </div>
        </div>
    )
});

export default Movie;
