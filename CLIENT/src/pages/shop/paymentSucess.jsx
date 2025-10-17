import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyPayment } from "../../features/common/orderSlice";

const PaymentSuccess = () => {
    const [status, setStatus] = useState("loading");
    const dispatch = useDispatch();
    const [searchParams, setSerachParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const payerId = searchParams.get('PayerID');
        if (token) {
            dispatch(verifyPayment({ token: token, payerId: payerId })).then(((data) => {
                console.log(data);
                if (data.payload.success == true) {
                    setStatus("success");
                } else {
                    setStatus('failed');
                }
            }))
        }
        else {
            setStatus('failed');
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {status === "loading" && <h2>Processing payment...</h2>}
            {status === "success" && (
                <>
                    <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
                    <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
                </>
            )}
            {status === "failed" && (
                <>
                    <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
                    <p className="text-gray-600 mt-2">Something went wrong. Please contact support.</p>
                </>
            )}
            {status === "invalid" && (
                <>
                    <h1 className="text-3xl font-bold text-yellow-600">Invalid Payment Token ⚠️</h1>
                </>
            )}
        </div>
    );
};

export default PaymentSuccess;
