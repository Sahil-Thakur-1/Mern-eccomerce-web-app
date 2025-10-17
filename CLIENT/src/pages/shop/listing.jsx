import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/shop/productSlice";
import { fetchCategories } from "../../features/shop/categorySlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart, deleteFromCart, fetchCart } from "../../features/shop/cartSlice";
import LoadingScreen from "../../components/common/loading";


const Listing = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, isLoading } = useSelector(state => state.product);
    const { categories, isLoading: categoryLoading } = useSelector(state => state.category);
    const { cart, isLoading: cartLoading } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const [filteredProduct, setFilterProduct] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        price: [],
    });

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);


    useEffect(() => {
        setFilterProduct(products);
    }, [products]);

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category")?.split(",") || [];
        const priceFromUrl = searchParams.get("price")?.split(",") || [];
        setFilters({ category: categoryFromUrl, price: priceFromUrl });
        if (products.length > 0) {
            let filtered = [...products];

            if (categoryFromUrl.length > 0) {
                filtered = filtered.filter((p) => categoryFromUrl.includes(p.category));
            }

            if (priceFromUrl.length > 0) {
                filtered = filtered.filter((p) => {
                    if (priceFromUrl.includes("Under $50") && p.price <= 50) return true;
                    if (priceFromUrl.includes("$50 - $100") && p.price > 50 && p.price <= 100) return true;
                    if (priceFromUrl.includes("Above $100") && p.price > 100) return true;
                    return false;
                });
            }

            setFilterProduct(filtered);
        }
    }, [searchParams, products])


    const toggleFilter = (type, value) => {
        setFilters((prev) => {
            const current = prev[type];
            const exists = current.includes(value);
            const updated = exists
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };


    const handleApplyFilters = () => {
        let filtered = [...products];

        if (filters.category.length > 0) {
            filtered = filtered.filter(product =>
                filters.category.includes(product.category)
            );
        }

        if (filters.price.length > 0) {
            filtered = filtered.filter(product => {
                if (filters.price.includes("Under $50") && product.price <= 50) return true;
                if (filters.price.includes("$50 - $100") && product.price > 50 && product.price <= 100) return true;
                if (filters.price.includes("Above $100") && product.price > 100) return true;
                return false;
            });
        }
        setFilterProduct(filtered);

        const params = {};
        if (filters.category.length > 0) params.category = filters.category.join(",");
        if (filters.price.length > 0) params.price = filters.price.join(",");
        setSearchParams(params);
    };

    if (isLoading || categoryLoading || cartLoading) {
        return <LoadingScreen />
    }

    return (
        <section className="w-full min-h-screen bg-[#0f0f0f] text-white py-16 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-16 pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
                            Collection
                        </h1>
                        <span className="text-sm text-white/30">{filteredProduct.length} items</span>
                    </div>
                    <button className="md:hidden flex items-center gap-2 text-sm px-4 py-2 border border-white/10 hover:border-white/30 transition">
                        <SlidersHorizontal size={18} />
                        Filters
                    </button>
                </div>

                <div className="flex gap-16">
                    {/* Sidebar Filters */}
                    <aside className="hidden md:block w-56 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="mb-12">
                                <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-5">
                                    Category
                                </h3>
                                <div className="space-y-3">
                                    {categories.map(
                                        (cat) => (
                                            <label
                                                key={cat._id}
                                                className="flex items-center gap-3 cursor-pointer text-white/60 hover:text-white text-sm transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.category.includes(cat._id)}
                                                    onChange={() =>
                                                        toggleFilter("category", cat._id)
                                                    }
                                                    className="w-4 h-4 border border-white/30 accent-white"
                                                />
                                                {cat.name}
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="mb-12">
                                <h3 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-5">
                                    Price
                                </h3>
                                <div className="space-y-3">
                                    {["Under $50", "$50 - $100", "Above $100"].map(
                                        (range) => (
                                            <label
                                                key={range}
                                                className="flex items-center gap-3 cursor-pointer text-white/60 hover:text-white text-sm transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.price.includes(range)}
                                                    onChange={() =>
                                                        toggleFilter("price", range)
                                                    }
                                                    className="w-4 h-4 border border-white/30 accent-white"
                                                />
                                                {range}
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleApplyFilters}
                                className="w-full py-3 text-xs font-medium uppercase tracking-widest border border-white/10 hover:bg-white hover:text-black transition"
                            >
                                Apply
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
                            {filteredProduct.map((product) => (
                                <div key={product._id} className="group cursor-pointer">
                                    <div className="relative w-full aspect-[3/4] bg-white/5 mb-4 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => navigate(`/shop/product/${product._id}`)} className="w-full py-2 text-xs font-medium uppercase tracking-wider bg-white text-black">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" flex flex-row justify-between items-start">
                                        <div>
                                            <h3 className="text-sm font-medium mb-1 text-white/90">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-white/50">Rs. {product.price}</p>
                                        </div>
                                        {(() => {
                                            const index = cart.products.findIndex(item => item.productId === product._id);

                                            if (index !== -1) {
                                                return (
                                                    <div className="flex items-center gap-2 border-2 py-1 px-2 rounded-md">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(addToCart({ productId: product._id, quantity: 1 }))
                                                                    .unwrap()
                                                                    .then(() => {
                                                                        dispatch(fetchCart());
                                                                    })
                                                                    .catch(err => console.error(err));
                                                            }}
                                                            className=" bg-white text-black font-bold rounded-sm border-2 px-2 hover:bg-stone-300"
                                                        >
                                                            +
                                                        </button>
                                                        <span className="text-white font-bold">{cart.products[index].quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(deleteFromCart({ productId: product._id, quantity: 1 }))
                                                                    .unwrap()
                                                                    .then(() => {
                                                                        dispatch(fetchCart());
                                                                    })
                                                                    .catch(err => console.error(err));
                                                            }}
                                                            className=" bg-white text-black font-bold rounded-sm border-2 px-2 hover:bg-stone-300"
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        dispatch(addToCart({ productId: product._id, quantity: 1 }))
                                                            .unwrap()
                                                            .then(() => {
                                                                dispatch(fetchCart());
                                                            })
                                                            .catch(err => console.error(err));
                                                    }}
                                                    className="p-2 bg-white text-black font-bold rounded-sm"
                                                >
                                                    Add to Cart
                                                </button>
                                            );
                                        })()}

                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {/* <div className="mt-20 text-center">
                            <button className="px-16 py-4 text-xs font-medium uppercase tracking-widest border border-white/10 hover:bg-white hover:text-black transition">
                                Load More
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Listing;