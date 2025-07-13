import { useDispatch, useSelector } from 'react-redux';
import Movie from './Movie';

import '../styles/movies.scss';

const Movies = ({ ref, movies, lastMovieRef }) => {
    const starredMovies = useSelector(state => state.starred.starredMovies);
    const watchLater = useSelector(state => state.watchLater.watchLaterMovies);

    return (
        <div ref={ref} data-testid="movies" className="movies">
            {movies.map((movie, index) => {
                const movieId = movie.id;    
                const isStarred = starredMovies.find(m => m.id === movieId);
                const isWatchLater = watchLater.find(m => m.id === movieId);

                return (
                    <Movie
                        key={index}
                        movie={movie}
                        isStarred={isStarred}
                        isWatchLater={isWatchLater}
                        {...(movies.length === index + 1 ? { lastMovieRef } : {})}
                    />
                )
            })}
        </div>
    )
}

export default Movies;
