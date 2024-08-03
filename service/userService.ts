import { User } from '../models/userModel';
import { users } from '../repository/userRepository';
import { format } from 'date-fns';

let currentId: number = 1;

export const registerUser = (name: string, email: string) => {
    if(users.some(user => user.email === email)) {
        throw new Error('User already registered')
    }

    users.push(new User(currentId++, name, email, `REGISTRATION: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`));
}

export const getAllUsers = () => {
    if(users.length===0) {
        throw new Error('No users registered')
    }

    return users;
}

export const getUserById = (id: number) => {
    const userFound = users.find(user => user.id === id);
    if(!userFound) {
        throw new Error('User not found')
    }

    return userFound;
}

export const getUserLastActivityById = (id: number) => {
    const userFound = users.find(user => user.id === id);
    if(!userFound) {
        throw new Error('User not found')
    }

    return userFound.lastActivity;
}

export const updateUser = (id: number, name: string, email: string) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
        throw new Error('User not found')
    }

    let responseString;
    let updatedField;

    if(users[userIndex].name !== name && users[userIndex].email !== email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated name to "${name}" and email to "${email}"`;
        updatedField = `name & email`;    
    } else if (users[userIndex].name !== name && users[userIndex].email === email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated name to "${name}"` 
        updatedField = `name`;   
    } else if (users[userIndex].name === name && users[userIndex].email !== email) {
        responseString = `User ID ${users[userIndex].id} (${users[userIndex].name}) succesfully updated email to "${email}"` 
        updatedField = `email`;   
    } else {
        responseString = `User had no update`
    }


    users[userIndex] = {
        id: id,
        name: name,
        email: email,
        lastActivity: `UPDATE(${updatedField}): ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`
    }

    return responseString;
}

export const deleteUserById = (id: number) => {
    let userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
        throw new Error('User not found')
    }

    let responseString: string = `User ID ${id} named ${users[userIndex].name} succesfully deleted`;

    users.splice(userIndex, 1);
    
    return responseString;
}


