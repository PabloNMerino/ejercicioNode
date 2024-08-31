import express, { Request, Response } from "express";
import { userController } from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.get("/all-users", userController.getUsers);
usersRouter.put("/update-user", userController.updateUser);
usersRouter.patch("/delete-user/:id", userController.deleteUser);

export default usersRouter;