import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/common/orderSlice";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    CreditCard,
    DollarSign,
} from "lucide-react";
import LoadingScreen from "../../components/common/loading";

const statusIcons = {
    processing: <Clock className="text-yellow-400" size={18} />,
    shipped: <Truck className="text-blue-400" size={18} />,
    delivered: <CheckCircle2 className="text-green-400" size={18} />,
    cancelled: <XCircle className="text-red-400" size={18} />,
};

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#0f0f0f] text-white overflow-hidden">
            {/* Background Branding */}
            <h2 className="absolute text-[20vw] font-extrabold text-white/5 leading-none select-none top-[10%]">
                ORDERS
            </h2>
            <h2 className="absolute text-[20vw] font-extrabold text-[#007bff]/10 leading-none select-none top-[10%] -mt-[2vw]">
                TRACKER
            </h2>

            {/* Foreground */}
            <div className="relative z-20 w-[90%] max-w-5xl mt-16 mb-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md p-8 shadow-xl">
                <h3 className="text-4xl font-bold mb-8 text-center tracking-wide">
                    Your Recent Orders
                </h3>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Package size={60} className="opacity-40 mb-4" />
                        <p className="text-lg">No orders placed yet.</p>
                        <button
                            onClick={() => navigate("/shop/products")}
                            className="text-white mt-6 border border-white rounded-full px-6 py-2 hover:bg-[#007bff] hover:border-[#007bff] hover:text-white transition-all duration-300 flex items-center gap-2"
                        >
                            Start Shopping <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                onClick={() => navigate(`/shop/orders/${order._id}`)}
                                className="group border border-white/20 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-[#007bff]/40 hover:shadow-[0_0_15px_#007bff40] transition-all duration-300 cursor-pointer"
                            >
                                {/* Header Row */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            {statusIcons[order.orderStatus]}
                                            <span
                                                className={`text-sm uppercase font-medium ${order.orderStatus === "delivered"
                                                    ? "text-green-400"
                                                    : order.orderStatus === "cancelled"
                                                        ? "text-red-400"
                                                        : order.orderStatus === "processing"
                                                            ? "text-yellow-400"
                                                            : "text-blue-400"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                • Order #{order._id.slice(-6).toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()} •{" "}
                                            {order.paymentMethod.toUpperCase()}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <p className="text-xl font-bold text-white flex items-center gap-2">
                                            <DollarSign size={18} className="text-[#007bff]" />
                                            {order.totalAmount.toFixed(2)}
                                        </p>
                                        <span className="text-sm text-gray-400 mt-1">
                                            {order.products.length} item
                                            {order.products.length > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Preview */}
                                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#007bff]/40 scrollbar-track-transparent">
                                    {order.products.map((item) => (
                                        <div
                                            key={item._id}
                                            className="min-w-[120px] flex flex-col items-center bg-white/5 rounded-xl p-3 border border-white/10 hover:border-[#007bff]/40 transition-all duration-300"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-20 w-20 object-contain rounded-lg mb-2"
                                            />
                                            <p className="text-xs text-gray-300 text-center truncate w-full">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-[#007bff] font-semibold">
                                                ${item.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Footer */}
                                <div className="flex flex-wrap justify-between items-center text-sm text-gray-400 mt-2 border-t border-white/10 pt-3">
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={16} className="text-[#007bff]" />
                                        Payment:{" "}
                                        <span className="text-white ml-1">
                                            {order.paymentStatus.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Truck size={16} className="text-[#007bff]" />
                                        Shipping:{" "}
                                        <span className="text-white ml-1">
                                            {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
