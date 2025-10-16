import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { orderController } from '../controllers/order.controller.js';


const orderRoute = express.Router();

orderRoute.post('/create', authMiddleware, (req, res) => orderController.createOrder(req, res));
orderRoute.post('/capture', authMiddleware, (req, res) => orderController.capturePayPalOrder(req, res));


export default orderRoute;