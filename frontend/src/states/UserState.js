import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { proxyFetch } from "../hooks/useApi";

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
        const userData = JSON.parse(sessionStorage.getItem("user_data"))
        if (userData){
            return userData;
        } else {
            try {
            const res = await proxyFetch('/api/user/info', {
                method: "GET",
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || 'Failed to fetch user');
            }
            sessionStorage.setItem("user_data", JSON.stringify(data.user));
            return data.user;
            } catch (error) {
                return rejectWithValue(error.message || 'An error occurred');
            }
        }
        
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
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

export default userSlice.reducer;
