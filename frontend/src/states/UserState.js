import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../lib/client";

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
    
        const isGuest = JSON.parse(sessionStorage.getItem("guest"));
        if(isGuest) return null;
            try {
            const res = await apiClient.get('/user/info');
            return res.data.user;
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
            }
        }
        
    
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: true,
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
        setUserNull : (state) => {
            if(state.data){
            state.data = null;
            state.error = null;
            state.loading = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            });
    }
});

export const { setUserNull } = userSlice.actions;
export default userSlice.reducer;
