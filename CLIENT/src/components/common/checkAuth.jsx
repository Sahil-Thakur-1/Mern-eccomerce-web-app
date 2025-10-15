import { useLocation, Navigate } from "react-router-dom";
import LoadingScreen from "./loading";

export function CheckAuth({ isAuthenticated, user, children, isLoading }) {
    const location = useLocation();

    console.log(location.pathname, isAuthenticated, isLoading, user);

    // if (isAuthenticated == false && !user && !location.pathname.includes('/auth/login')) {
    //     return <Navigate to="/auth/login" />;
    // }

    if (isLoading && !isAuthenticated) {
        return <LoadingScreen />;
    }


    if (!isAuthenticated &&
        !(location.pathname.includes('/login') ||
            location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />
    }


    if (isAuthenticated &&
        (location.pathname.includes('/login') ||
            location.pathname.includes('/register'))) {
        if (user === "admin") {
            return <Navigate to="/admin/dashboard" />
        }
        else {

            return <Navigate to="/shop/home" />
        }
    }

    if (isAuthenticated && user !== 'admin' && location.pathname.includes('/admin')) {
        return <Navigate to="/unauth-page" />
    }


    if (isAuthenticated && user === 'admin' && location.pathname.includes('/shop')) {
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>
}