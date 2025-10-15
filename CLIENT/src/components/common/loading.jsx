import React from "react";

const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-[#0f0f0f]">
            {/* App Name */}
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide text-white mb-8">
                <span className="text-white">UNI</span>
                <span className="text-[#007bff]">CLUB</span>
            </h1>

            {/* Loader (Blue Ring) */}
            <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-[#007bff]/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-[#007bff] animate-spin"></div>
            </div>

            {/* Optional Text */}
            <p className="text-white/60 text-sm mt-4 tracking-wide">Loading...</p>
        </div>
    );
};

export default LoadingScreen;

