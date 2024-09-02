import express, { Request, Response } from "express";
import { addressController } from "../controller/addressController";
import { isAuthenticated, isAdmin } from "../../../middlewares";

const addressRouter = express.Router();

addressRouter.post('', isAuthenticated, addressController.addAddress)
addressRouter.get('/all', isAuthenticated, addressController.getAllAddresses)
addressRouter.get('/:id', isAuthenticated, addressController.getAddressById)
addressRouter.delete("/:id", isAuthenticated, addressController.deleteAddressById)
addressRouter.put("/:id", isAuthenticated, addressController.updateAddressById)


export default addressRouter;