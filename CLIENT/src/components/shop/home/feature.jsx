import React from "react";
import {
    Truck,
    ShieldCheck,
    BadgeCheck,
    PiggyBank,
} from "lucide-react";

const Feature = () => {
    const featuredSections = [
        {
            id: 1,
            title: "Free Delivery",
            description:
                "Get your orders delivered to your doorstep quickly and at no extra cost — no minimum purchase required.",
            icon: <Truck size={36} strokeWidth={1.5} />,
        },
        {
            id: 2,
            title: "100% Secure Payment",
            description:
                "Your payment information is fully encrypted and processed through trusted, secure gateways.",
            icon: <ShieldCheck size={36} strokeWidth={1.5} />,
        },
        {
            id: 3,
            title: "Quality Guarantee",
            description:
                "We ensure every product meets high-quality standards so you get only the best value for your money.",
            icon: <BadgeCheck size={36} strokeWidth={1.5} />,
        },
        {
            id: 4,
            title: "Guaranteed Savings",
            description:
                "Shop smart with our regular deals and discounts — quality products at unbeatable prices.",
            icon: <PiggyBank size={36} strokeWidth={1.5} />,
        },
    ];

    return (
        <div className="w-full bg-[#0f0f0f] text-white py-20 px-10 md:px-20 flex flex-wrap justify-center items-center gap-10">
            {featuredSections.map((section) => (
                <div
                    key={section.id}
                    className="group relative flex flex-col items-start justify-start bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-[300px] h-[280px] hover:bg-[#007bff]/10 hover:border-[#007bff]/30 transition-all duration-300"
                >
                    <div className="text-[#007bff] mb-4 group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
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
};

export default Feature;
