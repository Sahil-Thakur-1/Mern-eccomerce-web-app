import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-600">Payment Cancelled </h1>
            <p className="text-gray-600 mt-2">You have cancelled the payment.</p>
            <button
                onClick={() => navigate("/")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default PaymentCancel;
