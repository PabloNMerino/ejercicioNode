import { Request, Response } from "express";
import User from "../model/userModel";

class UserController {

    async getEnabledUsers(req: Request, res: Response) {
        try {
            const users = await User.find({role: 'customer', is_enabled: true}, 'first_name last_name email phone created_at updated_at');
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async getDisabledUsers(req: Request, res: Response) {
        try {
            const users = await User.find({role: 'customer', is_enabled: false}, 'first_name last_name email phone created_at updated_at');
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async softDeleteUser(req: Request, res: Response) {

        try {
            const userId = req.userId;
            const user = await User.findById(userId);
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
            const userId = req.userId;
            const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }

    async getUserInformation(req: Request, res: Response) {
  
        try {
            const userId = req.userId;
            const user = await User.findById(userId, 'first_name last_name email phone role created_at updated_at');

            if(user!=undefined) {
                 return res.status(200).json(user);
            } else {
                return res.status(500);
            }        
        }
         catch(error) {
            return res.status(500);
        }
  
    }  

    async setNewAdmin(req: Request, res: Response) {
        const id = req.params.id;
        const { role } = req.body;

        try {
  
            const user = await User.findById(id);

            if (user?.role === 'admin') {
                return res.status(403).json({ error: "Cannot modify role on admin user" });
            }

            const userToUpdate = await User.findByIdAndUpdate(
                id,
                { $set: { role } }, 
                { new: true } 
              );
              
              if(userToUpdate!=undefined) {
                return res.status(200).json(`${userToUpdate.first_name} ${userToUpdate.last_name} is ${req.body.role === 'admin' ? 'now admin' : 'no longer admin'} `);
              }
            }
         catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }

    async fullDeleteUser(req: Request, res: Response) {
        const id = req.params.id;

        try {

            const user = await User.findById(id);

            if (user?.role === 'admin') {
                return res.status(403).json({ error: "Cannot delete an admin user" });
            }

            const deletedUser = await User.findByIdAndDelete(id);
              
              if(deletedUser!=undefined) {
                return res.status(200).json(`${deletedUser.first_name} ${deletedUser.last_name} succesfully deleted`);
              }
            }
         catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }

}
export const userController = new UserController();
