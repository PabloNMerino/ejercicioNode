import express, { Request, Response } from "express";

export default function controller(req: Request, res: Response) {
    res.send("Hello World");
}