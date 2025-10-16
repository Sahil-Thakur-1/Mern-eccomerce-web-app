import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { act } from "react";

const initialState = {
    address: [],
    isLoading: true,
    error: null
}


const addAddress = createAsyncThunk(
    'address/add',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/address/add',
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


const editAddress = createAsyncThunk(
    'address/edit',
    async (formData, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.put('http://localhost:3000/address/edit',
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


const fetchAddress = createAsyncThunk(
    'address/fetch',
    async (_, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.get('http://localhost:3000/address/get',
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


const deleteAddress = createAsyncThunk(
    'address/delete',
    async (addressId, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.delete('http://localhost:3000/address/delete',
                {
                    data: { addressId },
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


const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.address.push(action.payload.address);
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.address = action.payload.address;
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                console.log("error", action);
                state.isLoading = false;
                state.error = action.payload?.error;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.error;
            })
            .addCase(editAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.address.findIndex((item) => item._id === action.payload.address._id);
                state.address[index] = action.payload.address;
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.error;
            });;
    }
})


export default addressSlice.reducer;
export { addAddress, fetchAddress, deleteAddress, editAddress };