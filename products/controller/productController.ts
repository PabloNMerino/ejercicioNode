import { Request, Response } from "express";
import mongoose from 'mongoose';
import Product from "../model/productModel";

class ProductController {


    async createProduct(req: Request, res: Response) {
      const { category } = req.body;

      if (category && !mongoose.isValidObjectId(category)) {
        return res.status(400).json({ message: 'Invalid category ObjectId' });
      }
      try {
        const newProduct = Product.create(req.body);
        return res.status(201).send('Product succesfully created');
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    }

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

    async getProducts(req: Request, res: Response) {
        try {
          const products = await Product.find({ is_paused: false }).exec();
          if(!products) {
            res.status(404).send('No products registered')
          }
          return res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

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

    async updateStateProduct(req: Request, res: Response) {
      const id = req.params.id;
      const { is_paused } = req.body;

      try {
          const productToUpdate = await Product.findByIdAndUpdate(
              id,
              { $set: { is_paused } }, 
              { new: true } 
            );
            
            if(productToUpdate!=undefined) {
              return res.status(200).json(`${productToUpdate.name} is ${is_paused ? 'now paused' : 'no longer paused'} `);
            }
          }
       catch (error) {
          return res.status(400).json({ error: "Product not found" });
      }
  }

  async getProductsByPage(req: Request, res: Response) {

    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5; 

        const skip = (page - 1) * limit;
        const productsByPage = await Product.find({ is_paused: false }).skip(skip).limit(limit);

        const count = await Product.countDocuments();

        res.json({
          page,
          limit,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          data: productsByPage
        });
        }
     catch (error) {
        return res.status(400).json({ error: "Product not found" });
    }
}

}

export const productController = new ProductController();