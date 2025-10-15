import React, { useEffect } from "react";
import { ShoppingBag, Search, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCart } from "../../features/shop/cartSlice";

const ShopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch])
    return (
        <header className="fixed top-0 left-0 w-full z-50 text-white ">
            <div className=" mx-auto px-10 py-4 flex items-end justify-between">
                <div className="flex flex-row items-end gap-10">
                    {/* Logo */}
                    <h1 className="text-xl font-bold tracking-[0.15em] font-smooch select-none">
                        UNICLUB
                    </h1>
                    {/* Left - Nav Links */}
                    <nav className="hidden md:flex items-center gap-8 font-normal text-md tracking-wide">
                        <a onClick={() => navigate('/shop/home')} className="hover:text-gray-300 transition cursor-pointer">Home</a>
                        <a onClick={() => navigate('/shop/products')} className="hover:text-gray-300 transition cursor-pointer">Shop</a>
                        <a className="hover:text-gray-300 transition cursor-pointer">Hoddies</a>
                        <a className="hover:text-gray-300 transition cursor-pointer">T-shirt</a>
                        <a className="hover:text-gray-300 transition cursor-pointer">Accesories</a>
                    </nav>
                </div>


                {/* Right - Icons */}
                <div className="flex items-center gap-6 ml-auto">
                    <button className="hover:text-gray-300 transition">
                        <Search size={22} />
                    </button>
                    <button className="hover:text-gray-300 transition">
                        <User size={22} onClick={() => navigate('/shop/account')} />
                    </button>
                    <button onClick={() => navigate('/shop/cart')} className="hover:text-gray-300 transition relative">
                        <ShoppingBag size={22} />
                        <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {cart?.length ?? 0}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ShopHeader;
