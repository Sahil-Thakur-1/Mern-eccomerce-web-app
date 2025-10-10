import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { act } from "react";

const initialState = {
    products: [],
    isLoading: true,
    error: null
}


const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/admin/addProduct',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : "",
                    }
                });

            return res.data;
        }
        catch (error) {
            return error.response?.data || error;
        }
    }
);


const editProduct = createAsyncThunk(
    'product/editProduct',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.put('http://localhost:3000/admin/editProduct',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : "",
                    }
                });

            return res.data;
        }
        catch (error) {
            return error.response?.data || error;
        }
    }
);


const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.get('http://localhost:3000/common/products',
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


const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.delete('http://localhost:3000/admin/deleteProduct',
                {
                    data: { productId },
                    withCredentials: true,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : "",
                        "Content-Type": "application/json",
                    }
                });
            return res.data;
        }
        catch (error) {
            console.log(error.response?.data);
            return error.response?.data || error;
        }
    }
);




const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.products.push(action.payload.product);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log("error", action);
                state.isLoading = false;
                state.error = action.payload?.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.error;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.products.findIndex((item) => item._id === action.payload.product._id);
                state.products[index] = action.payload.product;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.error;
            });;
    }
})


export default productSlice.reducer;
export { addProduct, fetchProducts, deleteProduct, editProduct };