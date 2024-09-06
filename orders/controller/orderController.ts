import { Request, Response } from "express";
import Order from "../model/orderModel";
import { OrderStatus } from "../model/orderStatus";
import { PaymentStatus } from "../../payment/model/paymentStatusEnum";
import { paymentController } from "../../payment/controller/paymentController";
import { Types } from "mongoose";


class OrderController {

    //CREAR NUEVA ORDEN
    async createOrder(req: Request, res: Response) {

        try {
            const userId = req.userId;  
            const { items, total_price, payment_method } = req.body;

            const newOrder = new Order({
                user_id: userId,
                items: items,
                total_price,
                status: payment_method === "credit card"? OrderStatus.Paid : OrderStatus.Pending
            });

            const savedOrder = await newOrder.save();

            const order_id= Types.ObjectId.createFromHexString(savedOrder.id);
            const paymentStatus = payment_method === "credit card" ? PaymentStatus.Completed : PaymentStatus.Pending

            if(userId!=undefined) {
                  paymentController.newPayment(order_id, total_price, payment_method, paymentStatus);
            }
                    
            res.status(201).send("New order saved");
        } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    }

    //OBTENER TODAS LAS ORDENES DE UN USUARIO
    async getOrders(req: Request, res: Response) {
        try {

            const userId = req.userId;  
            const orders = await Order.find({ user_id: userId }).exec();

            return res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async cancelOrder(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const order = await Order.findByIdAndDelete(id).exec();
            paymentController.cancelPayment(Types.ObjectId.createFromHexString(order?.id))

            return res.status(200).send("Order canceled succesfully");
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    //PAGAR ORDER CON EFECTIVO
    async payWithCash(req: Request, res: Response) {
        const id = req.params.id;
        try {

            const order = await Order.findByIdAndUpdate(
                id,
                { $set: { status: OrderStatus.Paid } }, 
                { new: true } 
              );
              
                await paymentController.updatePaymentStatus(Types.ObjectId.createFromHexString(order?.id))

            return res.status(200).send("Order paid succesfully");
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

}

export const orderController = new OrderController();