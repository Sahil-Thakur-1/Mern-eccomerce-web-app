import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { fetchCart, addToCart, deleteFromCart } from "../../features/shop/cartSlice";
import LoadingScreen from "../../components/common/loading";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, totalAmount, isLoading } = useSelector((state) => state.cart);

    // useEffect(() => {
    //     dispatch(fetchCart());
    // }, [dispatch]);

    const handleQuantityChange = (productId, change) => {
        const item = cart.find((i) => i.productId._id === productId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return;

        dispatch(
            addToCart({
                productId,
                quantity: change,
            })
        ).then(() => dispatch(fetchCart()));
    };

    const handleRemoveItem = (productId) => {
        dispatch(deleteFromCart({ productId })).then(() => dispatch(fetchCart()));
    };

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="mx-auto mb-4 text-gray-600" size={48} />
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
            </div>
        );
    }

    const shipping = 100;
    const discount = 200;
    const total = totalAmount + shipping - discount;

    return (
        <div className="w-full min-h-screen bg-[#0f0f0f] text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingBag className="text-white" size={32} />
                        <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
                    </div>
                    <p className="text-gray-400 ml-11">{cart.length} items in your cart</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.products.map((item) => (
                            <div
                                key={item.productId}
                                className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:border-[#007bff] transition-all duration-300"
                            >
                                <div className="flex gap-5">
                                    {/* Product Image */}
                                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-all duration-300"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                {item.name}
                                            </h3>
                                            {/* <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <span className="px-2 py-0.5 bg-white/10 rounded border border-white/20">
                                                    Size: {item.size || "M"}
                                                </span>
                                            </div> */}
                                        </div>

                                        <div className="flex items-end justify-between mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-white/10 rounded-lg overflow-hidden border border-white/20">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(item.productId._id, -1)
                                                        }
                                                        className="px-3 py-1.5 hover:bg-[#007bff]/20 transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="px-4 text-sm font-semibold min-w-[40px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(item.productId, +1)
                                                        }
                                                        className="px-3 py-1.5 hover:bg-[#007bff]/20 transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-[#007bff]">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ₹{item.price} each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 sticky top-6">
                            <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="mb-6 p-3 bg-[#007bff]/10 rounded-xl border border-[#007bff]/30">
                                <div className="flex items-center gap-2 text-sm">
                                    <Tag size={16} className="text-[#007bff]" />
                                    <span className="text-gray-300">Discount Applied: SAVE200</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span className="font-medium">₹{shipping}</span>
                                </div>
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span className="font-medium">-₹{discount}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-white">Total</span>
                                    <span className="text-2xl font-bold text-[#007bff]">
                                        ₹{total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button onClick={() => navigate('../../shop/checkout')} className="w-full py-4 rounded-full bg-[#007bff] text-white font-semibold hover:bg-[#007bff]/80 transition-all duration-300">
                                Proceed to Checkout
                            </button>

                            <button className="w-full mt-3 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-all duration-300">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
