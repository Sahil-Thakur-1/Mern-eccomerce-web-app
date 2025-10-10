import express from 'express';
import authRouter from './auth.route.js';
import adminRoute from './admin.route.js';
import commonRoute from './common.route.js';
import cartRoute from './cart.route.js';

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use('/admin', adminRoute);
routes.use('/common', commonRoute);
routes.use('/cart', cartRoute);


export default routes;