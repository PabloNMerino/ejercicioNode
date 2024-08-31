import express, { Request, Response } from "express";
import { categoryController } from "../controller/categoryController";
import { isAdmin } from "../../middlewares";

const categoryRouter = express.Router();

categoryRouter.post('', isAdmin, categoryController.createCategory)
categoryRouter.get('/all', isAdmin, categoryController.getAllCategories)
categoryRouter.delete('/:id', isAdmin, categoryController.deleteCategory)
categoryRouter.get('/:id', isAdmin, categoryController.getCategory)
categoryRouter.put('/:id', isAdmin, categoryController.updateCategory)

export default categoryRouter;