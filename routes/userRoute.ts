import express, { Request, Response } from "express";
import { users } from '../repository/userRepository';
import {registerUser, getAllUsers, getUserById, getUserLastActivityById, updateUser, deleteUserById } from '../service/userService'

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the users dashboard!!!");
});

//Registrar usuario
usersRouter.post('', (req: Request, res: Response) => {

    const { name, email } = req.body;
    try{
        registerUser(name, email);
        res.status(201).send(`User "${req.body.name}" succesfully registered!`)
    } catch{
        res.status(400).send('User already exists')
    }
})

//Devolver lista de usuarios
usersRouter.get('/all', (req: Request, res: Response) => {
    try{
        const allUsers = getAllUsers();
        res.status(200).json(users)
    }catch{
        res.status(404).send('No users registered')
    }
})

//Buscar usuario por ID
usersRouter.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = getUserById(parseInt(id));
        res.json(user);
    } catch {
        res.status(404).send(`No user found with ID ${id}`)
    }
});

//Ver ultima fecha de actividad
usersRouter.get("/last-activity/:id", (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const userActivity = getUserLastActivityById(parseInt(id));
        res.json(userActivity);
    } catch {
        res.status(404).send(`No user found with ID ${id}`)
    }
});

//Actualizar usuario por ID
usersRouter.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email } = req.body

    try {
        const responseString = updateUser(parseInt(id), name, email)
        res.status(200).send(responseString);
    } catch {
        res.status(404).send(`No user found with ID ${id}`)
    }
});

//Borrar usuario por ID
usersRouter.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params

    try{
        const responseString = deleteUserById(parseInt(id));
        res.status(200).send(responseString);
    } catch {
        res.status(404).send((`No user found with ID ${id}`))
    }
});

export default usersRouter;