import { useLocation, Navigate } from "react-router-dom";

export function CheckAuth({ isAuthenticated, user, children, isLoading }) {
    const location = useLocation();

    console.log(location.pathname, isAuthenticated, isLoading, user);

    // if (!isAuthenticated && !user) {
    //     return <Navigate to="/auth/login" />;
    // }

    if (isLoading && !isAuthenticated) {
        return <div className='flex flex-col justify-center items-center min-h-screen'>
            <h2 className='font-bold text-3xl'>....isLoading</h2>
        </div>;
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