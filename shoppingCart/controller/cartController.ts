import { Request, Response } from "express";
import { Types } from 'mongoose'
import Cart from "../model/cartModel";
import jwt from "jsonwebtoken";

class CartController {


    async createCart(req: Request, res: Response) {
        const token = req.headers;

        try {
            const userDecoded: any = jwt.verify(
                token["token"] as string,
                process.env.JWT_SECRET!
                );


            const { items } = req.body;
            const newCart = new Cart({
                user_id: userDecoded.userId,
                items: items.map((item : any) => ({
                    product_id: Types.ObjectId.createFromHexString(item.product_id),
                    quantity: item.quantity
                }))
            });

            const savedCart = await newCart.save();
            res.status(201).send("Shopping cart saved");
        } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    }


}

export const cartController = new CartController();