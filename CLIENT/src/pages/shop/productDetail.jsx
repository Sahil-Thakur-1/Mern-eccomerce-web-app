import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/shop/productSlice";
import { addToCart } from "../../features/shop/cartSlice";

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useSelector(state => state.product);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const productDetail = products.find(p => p._id === id);
            setProduct(productDetail);
        }
    }, [products, id]);

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };

    const [selectedSize, setSelectedSize] = useState("M");

    return (
        !product ? <h1> product not found </h1> :
            <section className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center pt-32 pb-20 px-6">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left - Product Image */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 w-[400px] h-[500px] flex items-center justify-center overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Title */}
                        <h1 className="text-4xl font-extrabold tracking-wide text-white/90">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <p className="text-2xl font-semibold text-[#007bff]">
                            ₹{product.price}
                        </p>

                        {/* Description */}
                        <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                            {product.description}
                        </p>

                        {/* Size Selector */}
                        {/* <div className="mt-4">
                        <h4 className="text-sm uppercase text-gray-400 mb-2 tracking-wide">
                            Select Size
                        </h4>
                        <div className="flex gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 
                                        ${selectedSize === size
                                            ? "bg-[#007bff] text-white border-[#007bff]"
                                            : "border-white/30 text-white/70 hover:bg-white/10"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div> */}

                        {/* Quantity */}
                        <div className="flex flex-row items-center gap-4 mt-4">
                            <h4 className="text-sm uppercase text-gray-400 tracking-wide">
                                Quantity
                            </h4>
                            <div className="flex items-center border border-white/30 rounded-full overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-3 py-1 hover:bg-[#007bff]/20 transition"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="px-4 text-sm font-medium select-none">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-3 py-1 hover:bg-[#007bff]/20 transition"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button onClick={() => dispatch(addToCart({ "productId": product._id, "quantity": quantity }))} className="flex-1 py-3 rounded-full bg-[#007bff] hover:bg-[#007bff]/80 text-white font-semibold transition-all">
                                Add to Cart
                            </button>
                            <button className="flex-1 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default ProductDetail;
