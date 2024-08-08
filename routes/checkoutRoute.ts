import express, { Request, Response } from "express";
import { checkoutController } from "../controllers/checkoutController";

const checkoutRouter = express.Router();

//Realizar compra de productos
checkoutRouter.get('', checkoutController.newCheckout);


export default checkoutRouter;