import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/common/orderSlice";
import LoadingScreen from "../../components/common/loading";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const { orders = [], isLoading } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const filteredOrders = useMemo(() => {
        let list = orders.slice();
        if (statusFilter) {
            list = list.filter(
                (o) => (o.paymentStatus || "").toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (query && query.trim().length > 0) {
            const q = query.trim().toLowerCase();
            list = list.filter((o) => {
                if ((o._id || "").toLowerCase().includes(q)) return true;
                if ((o.paypalOrderId || "").toLowerCase().includes(q)) return true;
                if ((o.paymentMethod || "").toLowerCase().includes(q)) return true;
                if ((o.paymentStatus || "").toLowerCase().includes(q)) return true;
                if ((o.user?.name || "").toLowerCase().includes(q)) return true;
                if ((o.user?.email || "").toLowerCase().includes(q)) return true;
                if (Array.isArray(o.products)) {
                    for (const p of o.products) {
                        if ((p.name || "").toLowerCase().includes(q)) return true;
                    }
                }
                return false;
            });
        }

        list.sort((a, b) => {
            const ta = new Date(a.createdAt).getTime();
            const tb = new Date(b.createdAt).getTime();
            return sortBy === "newest" ? tb - ta : ta - tb;
        });

        return list;
    }, [orders, query, statusFilter, sortBy]);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="w-full h-[calc(100vh-64px)] p-6 bg-gray-50 overflow-auto">
            <div className="max-w-[1400px] mx-auto">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by order id, product, customer, status, method..."
                            className="w-full sm:w-[480px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
                        >
                            <option value="">All statuses</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>

                        <button
                            onClick={() => {
                                setQuery("");
                                setStatusFilter("");
                                setSortBy("newest");
                            }}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Reset
                        </button>
                    </div>
                </header>

                {filteredOrders.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">No orders found</div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                            >
                                {/* header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center px-5 py-4 bg-white">
                                    <div className="min-w-0">
                                        <div className="text-sm text-gray-500">Order ID</div>
                                        <div className="font-medium text-gray-800 break-words">{order._id}</div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            PayPal ID: {order.paypalOrderId || "—"}
                                        </div>
                                    </div>

                                    <div className="mt-3 md:mt-0 text-right">
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                      ${order.paymentStatus === "completed" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                                            {order.paymentStatus || "Pending"}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">{order.paymentMethod || "—"}</div>
                                    </div>
                                </div>

                                <div className="px-5 py-4 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                                        <div className="md:col-span-4">
                                            <div className="space-y-3">
                                                {Array.isArray(order.products) && order.products.map((p) => (
                                                    <div key={p._id || `${p.productId}-${Math.random()}`} className="flex items-center gap-4">
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            className="w-16 h-16 object-cover rounded-md border"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-gray-800">{p.name}</div>
                                                            <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                                                        </div>
                                                        <div className="text-right font-semibold text-gray-800">
                                                            {Number(p.price * (p.quantity || 1)).toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* shipping & summary */}
                                        <div className="md:col-span-2">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-500">Shipping</div>
                                                <div className="text-sm text-gray-700 mt-1">
                                                    {order.shippingAddress?.city || "—"}, {order.shippingAddress?.state || "—"}
                                                </div>
                                                <div className="text-sm text-gray-500">{order.shippingAddress?.country || "—"}</div>
                                                <div className="text-sm text-gray-500">Pincode: {order.shippingAddress?.postalCode || "—"}</div>

                                                <hr className="my-3" />

                                                <div className="text-sm text-gray-500">Total</div>
                                                <div className="text-lg font-semibold mt-1">
                                                    {Number(order.totalAmount || 0).toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    })}
                                                </div>

                                                <div className="text-xs text-gray-500 mt-2">Status: {order.orderStatus || "—"}</div>

                                                <div className="mt-3 text-xs text-gray-500">
                                                    Placed: {new Date(order.createdAt).toLocaleString("en-US")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="px-5 py-3 border-t flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Customer: {order.user?.name || "Guest"} {order.user?.email ? `(${order.user.email})` : ""}
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/orders/${order._id}`)
                                            }
                                            className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
                                        >
                                            View
                                        </button>
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

export default Orders;
