// features/shop/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    error: null,
    approveUrl: null,
    orderId: null,
};

export const createOrder = createAsyncThunk(
    "order/createPayPalOrder",
    async ({ amount, addressId, products, paymentMethod }, { getState }) => {
        console.log(amount, addressId, products, paymentMethod);
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const response = await axios.post("http://localhost:3000/order/create", {
                amount: amount,
                addressId: addressId,
                products: products,
                paymentMethod: paymentMethod
            }, {
                withCredentials: true,
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : "",
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (error) {
            return error.response?.data || error;
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approveUrl = action.payload.approveUrl;
                state.orderId = action.payload.orderId;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
