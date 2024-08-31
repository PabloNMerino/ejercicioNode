import { Request, Response } from "express";
import User from "../model/userModel";

class UserController {

    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find({is_enabled: true});
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            if(user!=null) {
                user.is_enabled = false;
                await user.save()
            }
            return res.status(200).send(`${user?.first_name} ${user?.last_name} deleted succesfully`);
        } catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }

    async getUser(req: Request, res: Response) {}
}

export const userController = new UserController();
