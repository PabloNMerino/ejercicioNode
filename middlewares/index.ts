import { Request, Response } from "express";

import jwt from "jsonwebtoken";

export function isAdmin(req: Request, res: Response, next: Function) {
    const token = req.headers;
    try {
        const isTokenvalid = jwt.verify(
        token["token"] as string,
        process.env.JWT_SECRET!
        );
        if (isTokenvalid) {
        next();
        } else {
        res.status(401).send("Unauthorized User");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}
