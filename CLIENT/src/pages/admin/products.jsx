import React from "react";
import { Search, ShoppingCart, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, fetchProducts } from "../../features/shop/productSlice";
import AddEditCategory from "./addEditCategory";
import { openModal } from "../../features/common/modalSlice";


const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    function handleDelete(id) {
        dispatch(deleteProduct(id)).then((data) => {
            if (data.payload.success) {
                dispatch(fetchProducts());
            }
        });
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 w-full">
            {/* Top Section (Fixed) */}
            <div className="p-6 flex flex-col flex-none">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                    <div className="flex flex-row gap-2">
                        <button onClick={() => navigate('add')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <ShoppingCart size={18} />
                            Add Product
                        </button>
                        <button onClick={() => dispatch(openModal(<AddEditCategory />))} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <Layers size={18} />
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-1/2">
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Filter / Sort */}
                    <div className="flex gap-3">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                            <option>All Categories</option>
                            <option>Electronics</option>
                            <option>Clothing</option>
                            <option>Home</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                            <option>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Scrollable Product Grid */}
            <div className="flex-1 overflow-y-auto p-6 pt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products && products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
                        >
                            <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                                {product.image ? <img className="w-full h-full object-cover" src={product.image} alt="" /> : "Image"}
                            </div>
                            <h2 className="text-lg font-medium text-gray-800">
                                {product.name}
                            </h2>
                            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                            <p className="text-gray-500 text-sm mb-2">Stock: {product.stock}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-600 font-semibold">Rs. {product.price}</span>
                                <div className="flex flex-row gap-2">
                                    <button onClick={() => navigate(`edit/${product._id}`)} className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
