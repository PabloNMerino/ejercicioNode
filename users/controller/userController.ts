import { Request, Response } from "express";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { UserDTO } from "../model/dto/requestUserInformationDto";

class UserController {

    async getEnabledUsers(req: Request, res: Response) {
        try {
            const users = await User.find({role: 'customer', is_enabled: true});
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async getDisabledUsers(req: Request, res: Response) {
        try {
            const users = await User.find({role: 'customer', is_enabled: false});
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async softDeleteUser(req: Request, res: Response) {
        const token = req.headers;

        try {
            const userDecoded: any = jwt.verify(
                token["token"] as string,
                process.env.JWT_SECRET!
                );

            const user = await User.findById(userDecoded.userId);
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
        const token = req.headers;
  
        try {
            const userDecoded: any = jwt.verify(
                token["token"] as string,
                process.env.JWT_SECRET!
                );

            const user = await User.findByIdAndUpdate(userDecoded.userId, req.body, {
            new: true,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }

    async getUserInformation(req: Request, res: Response) {
        const token = req.headers;
  
        try {
            const userDecoded: any = jwt.verify(
                token["token"] as string,
                process.env.JWT_SECRET!
                );

            const user = await User.findById(userDecoded.userId);

            if(user!=undefined) {
                const userDtoResponse: UserDTO = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    role: user.role,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                 }

                 return res.status(200).json(userDtoResponse);

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

            const user = await User.findByIdAndUpdate(
                id,
                { $set: { role } }, 
                { new: true } 
              );
              
              if(user!=undefined) {
                return res.status(200).json(`${user.first_name} ${user.last_name} is ${req.body.role === 'admin' ? 'now admin' : 'no longer admin'} `);
              }
            }
         catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }
    
}
export const userController = new UserController();
