import { Request, Response } from "express";
import User from "../../users/model/userModel";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

class AuthController {

    async register(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: "Registration failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser || existingUser.is_enabled==false) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await compare(password, existingUser.password!);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password" });
            }
    
            const token = sign(
                {
                userId: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
                },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );
    
            return res.header("token", token).status(200).json({ message: "Loggin Successful" });
        } catch (error) {}
    }

}

export const authController = new AuthController()