import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { shopController } from '../controllers/shop.controller.js';

const shopRoute = express.Router();

shopRoute.get('/fetchAddress', authMiddleware, (req, res) => shopController.getAddresses(req, res));
shopRoute.post('/addAddress', authMiddleware, (req, res) => shopController.addAddress(req, res));
shopRoute.put('/editAddress', authMiddleware, (req, res) => shopController.editAddress(req, res));
shopRoute.delete('/deleteAddress', authMiddleware, (req, res) => shopController.deleteAddress(req, res));

export default shopRoute;