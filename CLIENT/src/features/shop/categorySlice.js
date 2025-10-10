import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    isLoading: true,
    error: null
};

const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.get('http://localhost:3000/common/categories',
                {
                    withCredentials: true,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : "",
                        "Content-Type": "application/json",
                    }
                });
            return res.data;
        }
        catch (error) {
            return error.response?.data || error;
        }

    }
);


const addCategory = createAsyncThunk(
    'category/addCategories',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/admin/addcategory',
                { "categoryData": formData },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : "",
                        "Content-Type": "application/json",
                    }
                });
            return res.data;
        }
        catch (error) {
            return error.response?.data || error;
        }

    }
);


const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload.categories;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload.category);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

    }
})


export default categorySlice.reducer;
export { fetchCategories, addCategory };