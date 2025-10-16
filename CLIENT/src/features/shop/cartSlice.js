import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: null,
    totalAmount: 0,
    isLoading: false,
    error: null
};

const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.get('http://localhost:3000/cart/fetchCart',
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



const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/cart/deleteFromCart',
                formData,
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


const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/cart/addToCart',
                formData,
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


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                    state.cart = action.payload.cart;
                    state.totalAmount = action.payload.cart.totalAmount || 0;
                } else {
                    state.cart = [];
                    state.totalAmount = 0;
                    state.error = action.payload.message;
                }
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });


        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                    state.cart = action.payload.cart.products || state.cart;
                    state.totalAmount = action.payload.cart.products?.reduce(
                        (acc, item) => acc + (item?.price || 0) * item.quantity,
                        0
                    ) || state.totalAmount;
                } else {
                    state.error = action.payload.message;
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(deleteFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                } else {
                    state.error = action.payload.message;
                }
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default cartSlice.reducer;
export { addToCart, fetchCart, deleteFromCart }
