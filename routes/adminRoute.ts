import express, { Request, Response } from "express";
import controller from "../controllers/controller"

const adminRouter = express.Router();

function isAdmin(req: Request, res: Response, next: Function) {
    const { isAdmin } = req.body;
    if(isAdmin) {
        next();
    } else {
        res.status(401).send("Unauthorized User");
    }
}

adminRouter.post("/", isAdmin, (req: Request, res: Response) => controller(req, res));

adminRouter.get("/dashboard", isAdmin, (req: Request, res: Response) => {
    res.send("Welcome to the admin dashboard");
})

export default adminRouter;