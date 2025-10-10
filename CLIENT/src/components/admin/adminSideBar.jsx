import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package } from "lucide-react";

const AdminSideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { id: 2, name: "Orders", path: "/admin/orders", icon: ShoppingCart },
        { id: 3, name: "Products", path: "/admin/products", icon: Package },
        // { id: 4, name: "Features", path: "/admin/features", icon: ShoppingCart },
    ];

    const getTabClass = (path) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer ${location.pathname === path ? "bg-gray-600 font-semibold" : "hover:bg-gray-600"
        }`;

    return (
        <div className="h-[calc(100vh-64px)] w-64 bg-gray-700 text-white flex flex-col border-t-[0.1px] border-gray-400">
            <nav className="flex flex-col mt-4 space-y-2 px-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <div
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className={getTabClass(tab.path)}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{tab.name}</span>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default AdminSideBar;
