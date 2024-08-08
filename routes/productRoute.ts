import express, { Request, Response } from "express";
import { productController } from "../controllers/productController";

const productRouter = express.Router();

//Devolver lista de productos
productRouter.get('/all', productController.getProducts);


//Crear producto
productRouter.post('', productController.createProduct)

//Devolver producto por Id
productRouter.get('/:id', productController.getProductById);

//Borrar producto
productRouter.delete('/:id', productController.deleteProduct);

//Actualizar producto por Id
productRouter.put('/:id', productController.updateProduct);


export default productRouter;