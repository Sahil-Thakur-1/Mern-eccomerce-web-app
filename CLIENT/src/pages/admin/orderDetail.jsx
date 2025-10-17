import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/common/loading";
import { fetchAllOrders } from "../../features/common/orderSlice";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders, isLoading } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const found = orders.find((o) => o._id === id);
        if (found) {
            setOrder(found);
            setStatus(found.orderStatus);
        }
    }, [id, orders]);

    useEffect(() => { dispatch(fetchAllOrders()) }, [dispatch]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!order) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">Order not found.</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-64px)] w-full p-6 bg-gray-50">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Back to Orders
            </button>

            <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                    Order Details - #{order._id}
                </h2>

                {/* Order Status Section */}
                <div className="mb-6 flex items-center gap-4">
                    <label className="font-medium text-gray-700">Order Status:</label>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={() => alert("Status updated (temporary UI only)")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Save
                    </button>
                </div>

                {/* Shipping Info */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                    <div className="text-gray-700">
                        <p>{order.shippingAddress.name}</p>
                        <p>
                            {order.shippingAddress.streetAddress}, <br />
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p>Phone: {order.shippingAddress.phoneNumber}</p>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Products</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Price ($)</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((p) => (
                                    <tr key={p.productId}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">${p.price.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-4 py-2">{p.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 text-right text-lg font-semibold">
                    Total Amount: ${order.totalAmount.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
