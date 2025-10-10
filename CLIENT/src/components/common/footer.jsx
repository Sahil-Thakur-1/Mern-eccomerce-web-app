import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0f0f0f] text-white/80 pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div>
                    <h2 className="text-3xl font-extrabold tracking-wide text-white mb-6">
                        UNICLUB
                    </h2>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-[#007bff] transition-colors">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="hover:text-[#007bff] transition-colors">
                            <Twitter size={18} />
                        </a>
                        {/* <a href="#" className="hover:text-[#007bff] transition-colors">
                            <Pinterest size={18} />
                        </a> */}
                        <a href="#" className="hover:text-[#007bff] transition-colors">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="hover:text-[#007bff] transition-colors">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-sm font-semibold uppercase text-white mb-4 tracking-widest">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Offers</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Services</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                {/* About */}
                <div>
                    <h3 className="text-sm font-semibold uppercase text-white mb-4 tracking-widest">
                        About
                    </h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">How It Works</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Our Packages</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Promotions</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Refer A Friend</a></li>
                    </ul>
                </div>

                {/* Help Centre */}
                <div>
                    <h3 className="text-sm font-semibold uppercase text-white mb-4 tracking-widest">
                        Help Centre
                    </h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Payments</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Shipping</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Product Returns</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">FAQs</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Checkout</a></li>
                        <li><a href="#" className="hover:text-[#007bff] transition-colors">Other Issues</a></li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 mt-16 mb-8"></div>

            {/* Bottom Info */}
            <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60">
                <p>© 2025 UNICLUB. All rights reserved.</p>
                <p>
                    Made by <span className="font-semibold text-white/80">Sahil Thakur</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
