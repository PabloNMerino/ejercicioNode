import express, { Request, Response } from "express";
import { productController } from "../controller/productController";
import { isAdmin } from "../../middlewares";

const productRouter = express.Router();


productRouter.get('/all', productController.getProducts);
productRouter.post('', isAdmin, productController.createProduct);
productRouter.get("/paged", productController.getProductsByPage)
productRouter.get('/:id', productController.getProductById);
productRouter.delete('/:id', isAdmin, productController.deleteProduct);
productRouter.put('/:id', isAdmin, productController.updateProduct);
productRouter.patch('/:id', isAdmin, productController.updateStateProduct);



export default productRouter;