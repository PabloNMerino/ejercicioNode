import express, { Request, Response } from "express";
import { userController } from "../controller/userController";
import { isAuthenticated, isAdmin } from "../../middlewares";

const usersRouter = express.Router();

usersRouter.get("/all-enabled", isAdmin, userController.getEnabledUsers);
usersRouter.get("/all-disabled", isAdmin, userController.getDisabledUsers);
usersRouter.put("/update", isAuthenticated, userController.updateUser);
usersRouter.patch("/delete", isAuthenticated, userController.softDeleteUser);
usersRouter.get("/information", isAuthenticated, userController.getUserInformation);
usersRouter.patch("/set-admin/:id", isAdmin, userController.setNewAdmin);

export default usersRouter;