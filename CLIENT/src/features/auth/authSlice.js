import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    accessToken: null,
    error: null,
    user: null
}

const registerUser = createAsyncThunk(
    'auth/register',
    async (formData) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/register',
                formData,
                { withCredentials: true })
            return res.data;
        }
        catch (error) {
            return error.response?.data || "Registration failed";
        }
    }
);

const loginUser = createAsyncThunk(
    'auth/login',
    async (formData) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/login',
                formData,
                { withCredentials: true });
            return res.data;
        }
        catch (error) {
            console.log(error.response.data);
            return error.response?.data || error;
        }
    }
);


const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async () => {
        try {
            const res = await axios.get('http://localhost:3000/auth/refresh',
                { withCredentials: true });
            return res.data;
        }
        catch (error) {
            return error.response?.data || error;
        }
    }
);


const logout = createAsyncThunk(
    'auth/logout',
    async (_, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const res = await axios.post('http://localhost:3000/auth/logout',
                {},
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


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            }).addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.accessToken ? true : false;
                state.accessToken = action.payload.accessToken || null;
                state.user = action.payload.user || null;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(verifyUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                console.log(action.payload.user);
                state.isAuthenticated = action.payload.accessToken ? true : false;
                state.accessToken = action.payload.accessToken || null;
                state.user = action.payload.user || null;
                state.isLoading = false;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isAuthenticated = false;
                    state.accessToken = null;
                    state.user = null;
                }
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});


export default authSlice.reducer;
export { registerUser, loginUser, verifyUser, logout }
export const { setUser } = authSlice.actions;