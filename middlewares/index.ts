import { Request, Response } from "express";

import jwt from "jsonwebtoken";

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}


export function isAdmin(req: Request, res: Response, next: Function) {
    const token = req.headers;
    try {
        const isTokenvalid: any = jwt.verify(
        token["token"] as string,
        process.env.JWT_SECRET!
        );
        if (isTokenvalid.role === 'admin') {
        next();
        } else {
        res.status(401).send("Unauthorized User");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}


export function isAuthenticated(req: Request, res: Response, next: Function) {
    const token = req.headers["token"];

    if (!token) {
        return res.status(401).send("Unauthorized: User must be logged");
    }

    try {
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
        req.userId = decoded.userId;
        next();     
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
}