import { Request, Response } from "express";
import Product from "../models/productModel";
import Checkout from "../models/checkoutModel";
import { log } from "console";

class CheckoutController {

    //Crear nuevo producto
    async newCheckout(req: Request, res: Response) {
      const { product } = req.query;
      console.log(product);
    }

}

export const checkoutController = new CheckoutController();