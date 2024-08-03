import express, { Request, Response } from "express";
import { User } from '../models/userModel';
import { users } from '../repository/userRepository';
import { format } from 'date-fns';

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
    res.send("Bienvenido al panel de administracion de los usuarios!!!");
});

let currentId: number = 1;

//Registrar usuario
usersRouter.post('', (req: Request, res: Response) => {

    users.push(new User(currentId++, req.body.name, req.body.email, format(new Date(), 'dd/MM/yyyy HH:mm:ss')));
    res.status(201).send(`User "${req.body.name}" succesfully registered!`)
})

//Devolver lista de usuarios
usersRouter.get('/all', (req: Request, res: Response) => {
    if(users.length === 0) {
        res.status(404).send('No users registered')
    }
  res.status(200).json(users)
})

//Buscar usuario por ID
usersRouter.get("/:id", (req: Request, res: Response) => {
    const userFound = users.find(user => user.id === parseInt(req.params.id));
    if(!userFound) {
        return res.status(404).send(('User not found'))
    }
    res.json(userFound);

});

//Actualizar usuario por ID
usersRouter.put("/:id", (req: Request, res: Response) => {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id))
    if (userIndex === -1) {
        return res.status(404).send(('User not found'))
    }

    let responseString;

    if(users[userIndex].name !== req.body.name && users[userIndex].email !== req.body.email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated name to "${req.body.name}" and email to "${req.body.email}"`    
    } else if (users[userIndex].name !== req.body.name && users[userIndex].email === req.body.email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated name to "${req.body.name}"` 
    } else if (users[userIndex].name === req.body.name && users[userIndex].email !== req.body.email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated email to "${req.body.email}"` 
    } else {
        responseString = `User had no update`
    }


    users[userIndex] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        email: req.body.email,
        lastActivity: format(new Date(), 'dd/MM/yyyy HH:mm:ss')
    }

    res.status(200).send(responseString);
});

//Borrar usuario por ID
usersRouter.delete("/:id", (req: Request, res: Response) => {
    const idRequired = parseInt(req.params.id)

    let userIndex = users.findIndex(user => user.id === idRequired)
    console.log(users[userIndex].name);
        
    if (userIndex === -1) {
        return res.status(404).send(('User not found'))
    }

    let responseString: string = `User ID ${idRequired} named ${users[userIndex].name} succesfully deleted`;

    users.splice(userIndex, 1);
    res.send(responseString);
});

export default usersRouter;