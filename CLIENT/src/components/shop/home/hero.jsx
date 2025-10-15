import React from 'react'

import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col items-center justify-center h-screen w-full bg-[#0f0f0f] overflow-hidden">
            {/* Black Text */}
            <h2 className="text-[24vw] font-extrabold text-white/10 leading-none select-none m-0 p-0">
                UNICLUB
            </h2>

            {/* Gray Text */}
            <h2 className="z-15 text-[24vw] font-extrabold text-[#007bff]/30 leading-none -mt-[4vw] select-none m-0 p-0">
                BLUCINU
            </h2>

            {/* Center Image */}
            <img
                className="absolute z-10 h-full object-contain grayscale opacity-80"
                src="/hero_logo.png"
                alt="Hero Logo"
            />

            {/* Info Box */}
            <div className="absolute bottom-24 left-20 z-20 bg-white/10 backdrop-blur-md p-8 flex flex-col items-center border border-white/30 rounded-2xl shadow-lg">
                <h3 className="text-white text-5xl font-extrabold text-center leading-tight tracking-wide">
                    STREET<br />WEAR
                </h3>
                <p className="text-gray-300 text-xs mt-2">
                    High quality cool t-shirts for street fashion
                </p>
                <button onClick={() => navigate('/shop/products')} className="text-white text-sm flex flex-row items-center justify-center gap-2 mt-4 border border-white rounded-full px-6 py-2 hover:bg-[#007bff] hover:border-[#007bff] hover:text-white transition-all duration-300">
                    Start Shopping <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default Hero;
