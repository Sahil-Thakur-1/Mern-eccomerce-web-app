import React, { useState } from "react";
import { MapPin, Plus, CreditCard, Trash2, Edit3, ShoppingBag, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteAddress, editAddress, fetchAddress } from "../../features/shop/addressSlice";
import LoadingScreen from "../../components/common/loading";
import { openModal } from "../../features/common/modalSlice";
import AddEditAddress from "./addEditAddress";
import { createOrder } from "../../features/common/orderSlice";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { address, isLoading, error } = useSelector(state => state.address);
    const { totalAmount, cart, isLoading: cartLoader } = useSelector(state => state.cart);
    const { approveUrl } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(fetchAddress());
    }, [dispatch])

    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [selectedAddress, setSelectedAddress] = useState(null);

    const shipping = 100;
    const discount = 200;
    const total = totalAmount + shipping - discount;

    const handlePlaceOrder = async () => {
        if (selectedPayment == 'cod') {
            dispatch(createOrder({ amount: total, addressId: selectedAddress, products: cart.products, paymentMethod: 'cod' }));
        } else {
            dispatch(createOrder({ amount: total, addressId: selectedAddress, products: cart?.products, paymentMethod: 'PayPal' })).then(({ payload }) => {
                if (payload.approveUrl) {
                    window.location.href = payload.approveUrl;
                } else {
                    console.error("PayPal approve URL not found!");
                }
            });
        }
    }


    if (isLoading || cartLoader) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingBag className="text-white" size={32} />
                        <h1 className="text-4xl font-bold text-white">Checkout</h1>
                    </div>
                    <p className="text-gray-400 ml-11">Confirm your address and payment method</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Address Section */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-[#007bff]" size={24} />
                                    <h2 className="text-2xl font-semibold text-white">Delivery Address</h2>
                                </div>
                                <button
                                    onClick={() => dispatch(openModal(<AddEditAddress />))}
                                    className="flex items-center gap-2 text-sm bg-[#007bff] px-3 py-1.5 rounded-full hover:bg-[#007bff]/80 transition"
                                >
                                    <Plus size={16} /> Add New
                                </button>
                            </div>

                            {address.length === 0 ? (
                                <p className="text-gray-400 text-sm">No address found. Add one to continue.</p>
                            ) : (
                                address.map((addr, index) => (
                                    <div
                                        key={addr._id}
                                        onClick={() => setSelectedAddress(String(addr._id))}
                                        className={`border rounded-xl p-4 mb-4 cursor-pointer transition-all ${selectedAddress === String(addr._id) ? "border-[#007bff]" : "border-white/20"}  bg-white/5 hover:border-[#007bff]/40`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg text-white">{addr.fullName}</h3>
                                                <p className="text-gray-400 text-sm">
                                                    {addr.streetAddress}, {addr.city}, {addr.state} - {addr.postalCode}
                                                </p>
                                                <p className="text-gray-400 text-sm">{addr.country}</p>
                                                <p className="text-gray-400 text-sm mt-1">📞 {addr.phoneNumber}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => { }}
                                                    className="p-2 text-gray-300 hover:text-[#007bff] transition"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => dispatch(deleteAddress(addr._id))}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Payment Options */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="text-[#007bff]" size={22} />
                                <h2 className="text-2xl font-semibold">Payment Options</h2>
                            </div>

                            <div className="space-y-3">
                                <label
                                    className={`flex items-center justify-between cursor-pointer p-4 border rounded-xl bg-white/5 hover:bg-white/10 transition ${selectedPayment === "cod" ? "border-[#007bff]" : "border-white/20"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <CircleDollarSign className="text-[#007bff]" size={20} />
                                        <span className="text-white font-medium">Cash on Delivery</span>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedPayment === "cod"}
                                        onChange={() => setSelectedPayment("cod")}
                                        className="accent-[#007bff]"
                                    />
                                </label>

                                <label
                                    className={`flex items-center justify-between cursor-pointer p-4 border rounded-xl bg-white/5 hover:bg-white/10 transition ${selectedPayment === "online" ? "border-[#007bff]" : "border-white/20"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="text-[#007bff]" size={20} />
                                        <span className="text-white font-medium">Pay Online (UPI / Card / Netbanking)</span>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedPayment === "online"}
                                        onChange={() => setSelectedPayment("online")}
                                        className="accent-[#007bff]"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 sticky top-6">
                            <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-white">Total</span>
                                    <span className="text-2xl font-bold text-[#007bff]">₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                className="w-full py-4 rounded-full bg-[#007bff] text-white font-semibold hover:bg-[#007bff]/80 transition-all duration-300 flex items-center justify-center gap-2"
                                onClick={
                                    handlePlaceOrder
                                }
                            >
                                <CreditCard size={20} /> Place Order
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="w-full mt-3 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-all duration-300"
                            >
                                Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Checkout;
