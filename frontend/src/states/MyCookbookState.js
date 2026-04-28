import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../lib/client";
import { cache } from "react";

export const getMyCookbook = createAsyncThunk(
    'myCookbook/getMyCookbook',
    cache(async (_, { rejectWithValue }) => {
    try {
        const res = await apiClient.get('/user/getMyCookbook');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
    })
);

const myCookbookSlice = createSlice({
    name: "myCookbook",
    initialState: {
        data: null,
        loading: true,
        error: null,
    },
    reducers: {
       addToMycookbook: (state, action) => {
            state.data.push(
                action.payload
            )
       },
       removeFromMycookbook: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload)
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyCookbook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyCookbook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getMyCookbook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            });
    }
})

export default myCookbookSlice.reducer;
export const {addToMycookbook, removeFromMycookbook} = myCookbookSlice.actions;