import authReducer from "@/features/auth/authSlice";
import categoryReducer from "@/features/shop/categorySlice";
import productReducer from "@/features/shop/productSlice";
import modalReducer from "@/features/common/modalSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/shop/cartSlice";
import addressReducer from "@/features/shop/addressSlice";
import orderReducer from "@/features/common/orderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        modal: modalReducer,
        product: productReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
    }
});


export default store;