import express, { Request, Response } from "express";
import { orderController } from "../controller/orderController";
import { isAuthenticated } from "../../middlewares";

const orderRouter = express.Router();

orderRouter.post('', isAuthenticated, orderController.createOrder);
orderRouter.get('/all', isAuthenticated, orderController.getOrders);
orderRouter.delete('/:id', isAuthenticated, orderController.cancelOrder);
orderRouter.patch('/:id', isAuthenticated, orderController.payWithCash);



export default orderRouter;