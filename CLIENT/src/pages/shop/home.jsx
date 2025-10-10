import React from "react";
import Feature from "../../components/shop/home/feature";
import NewArrivals from "../../components/shop/home/newArrival";
import Hero from "../../components/shop/home/hero";

const Home = () => {
    return (
        <>
            {/* Hero Section*/}
            <Hero />

            {/* Feature Section */}
            <Feature />

            {/* New Arrival */}
            <NewArrivals />

            <div className="w-full bg-[#0f0f0f] px-30 py-30 flex flex-col items-center">
                <div className="w-full flex flex-col md:flex-row gap-8">
                    {[
                        {
                            src: "https://creativeinvisibles.eu/wp-content/uploads/2022/11/Opportunities-in-street-Image-1.jpg",
                            title: 'Street Art'
                        },
                        {
                            src: "https://static.vecteezy.com/system/resources/thumbnails/042/241/658/small_2x/street-culture-typography-slogan-with-bear-doll-graffiti-art-style-illustration-on-black-background-for-streetwear-t-shirt-design-vector.jpg",
                            title: 'Street Culture'
                        },
                        {
                            src: "https://www.esamskriti.com/essays/images/indian-art-pic1.jpg",
                            title: 'Street Vibe'
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="relative group w-full md:w-1/3 h-60 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                        >
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={item.src}
                                alt=""
                            />
                            <p className="absolute bottom-3 right-3 text-white text-lg italic tracking-wide">
                                {item.title}
                            </p>

                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="relative w-full h-80 flex items-center justify-center overflow-hidden bg-black">
                {/* Background Image */}
                <img
                    className="absolute w-full h-full object-cover  brightness-[0.4]"
                    src="https://blog.adobe.com/en/publish/2017/07/07/media_13f7388f9bd38d1adf1e97610b052b61e7114e094.png?width=750&format=png&optimize=medium"
                    alt="Background"
                />

                {/* Subtle Glassy Overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full max-w-6xl px-6 md:px-12 text-white">
                    {/* Left Section */}
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-3">
                            Get <span className="text-white/80 italic">20% OFF</span> on your first order
                        </h2>
                        <p className="text-sm md:text-base text-white/70">
                            Subscribe to our newsletter for exclusive offers & updates.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-5 py-3 rounded-full w-64 border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/40"
                        />
                        <button
                            type="submit"
                            className="mt-3 sm:mt-0 px-8 py-3 rounded-full bg-white/90 text-black font-medium uppercase tracking-wider hover:bg-white transition-all duration-300"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Home;
