import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrailer = createAsyncThunk('fetch-trailer', async (apiUrl) => {
    const response = await fetch(apiUrl);
    return response.json();
})

const viewTrailerSlice = createSlice({
    name: 'viewTrailer',
    initialState: {
        key: '',
        openViewTrailerModal: false,
        fetchStatus: '',
    },
    reducers: {
        closeViewTrailerModal: state => {
            state.openViewTrailerModal = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTrailer.fulfilled, (state, action) => {
            const data = action.payload?.videos?.results;
            if (data?.length) {
                const trailer = data.find(vid => vid.type === 'Trailer');
                state.key = trailer?.key ? trailer.key : data?.[0]?.key;
            } else {
                state.key = '';
            }
            state.openViewTrailerModal = true;
            state.fetchStatus = 'success';
        }).addCase(fetchTrailer.pending, state => {
            state.fetchStatus = 'loading';
        }).addCase(fetchTrailer.rejected, state => {
            state.fetchStatus = 'error';
        })
    }
});

export default viewTrailerSlice;
