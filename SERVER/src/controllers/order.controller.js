import axios from 'axios'
import Order from '../model/order.model.js';
import { Address } from '../model/address.model.js';



class OrderController {

    async createOrder(req, res) {
        try {
            const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";
            const { amount, addressId, products, paymentMethod } = req.body;
            const user = req.user;

            if (!amount || !addressId || !products?.length || !paymentMethod) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const address = await Address.findById(addressId);
            if (!address) {
                return res.status(404).json({ success: false, message: "Address not found" });
            }

            let paypalOrderId = null;
            let approveUrl = null;
            let paymentStatus = 'pending';

            if (paymentMethod === 'PayPal') {
                const auth = Buffer.from(
                    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
                ).toString("base64");

                const paypalResponse = await axios.post(
                    `${PAYPAL_API_BASE}/v2/checkout/orders`,
                    {
                        "intent": "CAPTURE",
                        "purchase_units": [
                            {
                                "amount": {
                                    "currency_code": "USD",
                                    "value": amount
                                },
                                "shipping": {
                                    "address": {
                                        "admin_area_2": address.streetAddress,
                                        "admin_area_1": address.city,
                                        "postal_code": address.postalCode,
                                        "country_code": "IN"
                                    }
                                }
                            }
                        ],
                        "application_context": {
                            "brand_name": "UNICLUB",
                            "landing_page": "NO_PREFERENCE",
                            "user_action": "PAY_NOW",
                            "return_url": "http://localhost:5173/payment/success",
                            "cancel_url": "http://localhost:5173/payment/cancel"
                        }
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Basic ${auth}`,
                        },
                    }
                );

                paypalOrderId = paypalResponse.data.id;
                approveUrl = paypalResponse.data.links.find(link => link.rel === "approve")?.href;
            }

            const order = new Order({
                userId: user.userId,
                products: products,
                totalAmount: amount,
                paymentMethod,
                paypalOrderId,
                paymentStatus,
                shippingAddress: address,
            });

            await order.save();

            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                order,
                approveUrl: approveUrl
            });
        } catch (e) {
            console.error("Order creation error:", e);
            res.status(500).json({ success: false, message: e.message });
        }
    }

    async capturePayPalOrder(req, res) {
        try {
            const { orderId } = req.body;
            const auth = Buffer.from(
                `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
            ).toString("base64");

            const response = await axios.post(
                `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`,
                    },
                }
            );

            const order = await Order.findOneAndUpdate(
                { paypalOrderId: orderId },
                { paymentStatus: 'completed' },
                { new: true }
            );

            res.status(200).json({ success: true, message: "Payment captured", order });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    }


}

export const orderController = new OrderController();