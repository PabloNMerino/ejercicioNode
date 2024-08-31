import express, { Request, Response } from "express";
import { productController } from "../controller/productController";
import { isAdmin, isAuthenticated } from "../../middlewares";

const productRouter = express.Router();

//Devolver lista de productos
productRouter.get('/all', productController.getProducts);


//Crear producto
productRouter.post('', isAuthenticated, productController.createProduct)

//Devolver producto por Id
productRouter.get('/:id', productController.getProductById);

//Borrar producto
productRouter.delete('/:id', isAdmin, productController.deleteProduct);

//Actualizar producto por Id
productRouter.put('/:id', productController.updateProduct);


export default productRouter;