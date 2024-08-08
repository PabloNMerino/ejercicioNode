import { Request, Response } from "express";
import Product from "../models/productModel";

class ProductController {

    //Crear nuevo producto
    async createProduct(req: Request, res: Response) {
      try {
        const newProduct = Product.create(req.body);
        return res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    }

    //Devolver producto por Id
    async getProductById(req: Request, res: Response) {
      const { id } = req.params;
    
      try{
          const product = await Product.findById(id);
          if(!product) {
              return res.status(404).json({message: `Product id ${id} not found`})
          }
          res.json(product);
      } catch (error) {
          res.status(500).json({ message: 'Server error', error });
      }
    }

    //Devolver lista de productos
    async getProducts(req: Request, res: Response) {
        try {
          const products = await Product.find().exec();
          if(!products) {
            res.status(404).send('No products registered')
          }
          return res.status(200).json(products);
        } catch (error) {
           // res.status(500).json({ message: 'Server error', error });
           console.log(error);
           
        }
    }

    //Borrar producto por Id
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const product = await Product.findByIdAndDelete(id);
          if(!product) {
            res.status(404).send(`Product with Id ${id} not found`)
          }
          return res.status(200).send(`Product with Id ${id} succesfully deleted`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    //Borrar producto por Id
    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const {name, description, price, amount_available} = req.body;
        try {
          const product = await Product.findByIdAndUpdate(id, req.body);

          if(!product) {
            res.status(404).send(`Product with Id ${id} not found`)
          }

          return res.status(200).send(`Product with Id ${id} succesfully updated`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

}

export const productController = new ProductController();