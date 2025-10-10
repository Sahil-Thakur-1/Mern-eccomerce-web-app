import React from 'react'
import { ArrowRight, LucideShoppingCart } from "lucide-react";

const Feature = () => {
    const featuredSections = [{
        id: 1,
        title: "Free Delivery",
        description: "Lorem ipsum dolor sit amet, consectetur adipi elit. ipsum dolor sit amet."
    },
    {
        id: 2,
        title: "100% secure payment",
        description: "Lorem ipsum dolor sit amet, consectetur adipi elit. ipsum dolor sit amet."
    },
    {
        id: 3,
        title: "Quality guarantee",
        description: "Lorem ipsum dolor sit amet, consectetur adipi elit. ipsum dolor sit amet."
    },
    {
        id: 4,
        title: "guaranteed savings",
        description: "Lorem ipsum dolor sit amet, consectetur adipi elit. ipsum dolor sit amet."
    }]
    return (
        <div className="w-full bg-[#0f0f0f] text-white py-20 px-10 md:px-20 flex flex-wrap justify-center items-center gap-10">
            {featuredSections.map((section) => (
                <div
                    key={section.id}
                    className="group relative flex flex-col items-start justify-start bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-[300px] h-[280px] hover:bg-[#007bff]/10 hover:border-[#007bff]/30 transition-all duration-300"
                >
                    <div className="text-[#007bff] mb-4 group-hover:scale-110 transition-transform duration-300">
                        <LucideShoppingCart size={36} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-wide mb-2 text-white/90">
                        {section.title}
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed">
                        {section.description}
                    </p>

                    {/* Decorative Line */}
                    <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#007bff] transition-all duration-500"></span>
                </div>
            ))}
        </div>
    );
}

export default Feature
