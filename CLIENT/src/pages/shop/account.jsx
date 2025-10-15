import React from "react";
import { User, Heart, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Account = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <section className="w-full bg-[#0f0f0f] text-white py-24 px-24">
            <div className=" mx-auto my-auto flex flex-col md:flex-row gap-12">
                {/* Left Sidebar */}
                <div className="md:w-1/3 w-full bg-white/5 rounded-2xl p-8 flex flex-col items-center text-center backdrop-blur-sm border border-white/10">
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-2 border-white/20">
                        <img
                            src="https://i.pravatar.cc/150?img=3"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-semibold">{user.userName}</h2>
                    <p className="text-white/50 text-sm mt-1 mb-6">{user.email}</p>

                    <button className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-white/80 transition">
                        Edit Profile
                    </button>

                    <div className="w-full border-t border-white/10 my-8"></div>

                    <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-red-500 transition">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {/* Right Content */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition border border-white/10 cursor-pointer">
                        <ShoppingBag className="mb-4" size={28} />
                        <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                        <p className="text-sm text-white/50">
                            Track, view, or reorder your past purchases.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition border border-white/10 cursor-pointer">
                        <Heart className="mb-4" size={28} />
                        <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
                        <p className="text-sm text-white/50">
                            View your favorite items and save for later.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition border border-white/10 cursor-pointer">
                        <User className="mb-4" size={28} />
                        <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                        <p className="text-sm text-white/50">
                            Manage your personal information and address.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition border border-white/10 cursor-pointer">
                        <Settings className="mb-4" size={28} />
                        <h3 className="text-lg font-semibold mb-2">Settings</h3>
                        <p className="text-sm text-white/50">
                            Update preferences, password, and notifications.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;
