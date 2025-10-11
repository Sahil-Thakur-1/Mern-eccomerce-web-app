import React from "react";
import { useSelector } from "react-redux";


const NewArrivals = () => {
    const { products } = useSelector(state => state.product);
    return (
        <section className="w-full bg-[#0f0f0f] text-white py-24 flex flex-col items-center">
            {/* Section Title */}
            <h2 className="text-lg uppercase tracking-[0.3em] text-white/70 mb-6">
                New Arrivals
            </h2>

            {/* Accent Line */}
            <div className="w-20 h-[2px] bg-[#007bff]/60 mb-12 rounded-full"></div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl">
                {products.map((product, index) => index < 8 ? (
                    <div
                        key={product.id}
                        className="flex flex-col items-center group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#007bff]/40 hover:bg-[#007bff]/10"
                    >
                        {/* Product Image */}
                        <div className="w-full aspect-[2.8/4] flex items-center justify-center overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="w-full px-4 py-4 flex flex-row justify-between items-center">
                            <p className="text-sm text-white/80 tracking-wide">{product.name}</p>
                            <p className="text-sm text-[#007bff]/90 font-semibold">{product.price}</p>
                        </div>
                    </div>
                )
                    : null)}
            </div>


            {/* View All Button */}
            {products.length > 8 ?
                <button className="mt-16 border border-white/20 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#007bff] hover:border-[#007bff] hover:text-white transition-all duration-300">
                    View All Products
                </button> : null}
        </section>
    );
};

export default NewArrivals;

