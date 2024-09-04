import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import Order from "../model/orderModel";
import { OrderStatus } from "../model/orderStatus";

class OrderController {

    //CREAR NUEVA ORDEN
    async createOrder(req: Request, res: Response) {

        try {
            const userId = req.userId;  
            const { items, total_price } = req.body;

            const newOrder = new Order({
                user_id: userId,
                items: items,
                total_price
            });

            const savedOrder = await newOrder.save();
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
            await Order.findByIdAndDelete(id).exec();

            return res.status(200).send("Order canceled succesfully");
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    //PAGAR ORDER CON EFECTIVO
    async payWithCash(req: Request, res: Response) {
        const id = req.params.id;
        try {

             await Order.findByIdAndUpdate(
                id,
                { $set: { status: OrderStatus.Paid } }, 
                { new: true } 
              );

            return res.status(200).send("Order paid succesfully");
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

}

export const orderController = new OrderController();