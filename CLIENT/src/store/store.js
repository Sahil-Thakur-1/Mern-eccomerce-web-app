import authReducer from "@/features/auth/authSlice";
import categoryReducer from "@/features/shop/categorySlice";
import productReducer from "@/features/shop/productSlice";
import modalReducer from "@/features/common/modalSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/shop/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        modal: modalReducer,
        product: productReducer,
        cart: cartReducer
    }
});


export default store;