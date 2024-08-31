import { Request, Response } from "express";
import Category from "../model/categoryModel";

class CategoryController {

    //Crear nuevo producto
    async createCategory(req: Request, res: Response) {
      try {
        const newCategory = Category.create(req.body);
        return res.status(201).send(`Category ${req.body.name} succesfully created`);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    }

    async getCategory(req: Request, res: Response) {
        const { id } = req.params;
      
        try{
            const category = await Category.findById(id);
            if(!category) {
                return res.status(404).json({message: `Category id ${id} not found`})
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
      }
    
      async getAllCategories(req: Request, res: Response) {
        try {
          const categories = await Category.find();
          if(!categories) {
            res.status(404).send('No categories registered')
          }
          return res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const category = await Category.findByIdAndDelete(id);
          if(!category) {
            res.status(404).send(`Category with Id ${id} not found`)
          }
          return res.status(200).send(`Category with Id ${id} succesfully deleted`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;
    
        try {
            const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!category) {
                return res.status(404).send(`Category with Id ${id} not found`);
            }
    
            return res.status(200).json({ message: `Category with Id ${id} successfully updated`});
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }
}

export const categoryController = new CategoryController();