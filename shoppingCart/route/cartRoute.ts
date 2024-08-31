import express, { Request, Response } from "express";
import { cartController } from "../controller/cartController";
import { isAuthenticated } from "../../middlewares";

const cartRouter = express.Router();


//cartRouter.get('/all', cartController.getProducts);
cartRouter.post('', isAuthenticated, cartController.createCart);
//productRouter.get('/:id', productController.getProductById);
//productRouter.delete('/:id', isAdmin, productController.deleteProduct);
//productRouter.put('/:id', isAdmin, productController.updateProduct);
//productRouter.patch('/:id', isAdmin, productController.updateStateProduct);



export default cartRouter;