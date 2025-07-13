import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk('fetch-movies', async apiUrl => {
    const response = await fetch(apiUrl);
    return response.json();
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        totalPages: 0,
        fetchStatus: '',
    },
    reducers: {
        resetMovies: state => {
            state.movies =[];
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (action.payload.page === 1) {
                state.totalPages = action.payload.total_pages;
                state.movies = action.payload.results;
            } else {
                state.movies = [...state.movies, ...action.payload.results];
            }
            state.fetchStatus = 'success';
        }).addCase(fetchMovies.pending, state => {
            state.fetchStatus = 'loading';
        }).addCase(fetchMovies.rejected, state => {
            state.fetchStatus = 'error';
        })
    }
})

export default moviesSlice
