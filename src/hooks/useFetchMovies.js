import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";
import { fetchMovies } from "../data/moviesSlice";

export const useFetchMovies = (searchQuery, page, disableFetch) => {
    const dispatch = useDispatch();
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (disableFetch) return;

        const url = searchQuery
            ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`
            : `${ENDPOINT_DISCOVER}&page=${page}`;
        
        dispatch(fetchMovies(url));
        setSearchParams(createSearchParams(searchQuery ? { search: searchQuery } : {}));
    }, [dispatch, searchQuery, disableFetch, page, setSearchParams]);
};
