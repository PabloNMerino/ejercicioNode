
export class User {
    id: number;
    name: string;
    email: string;
    lastActivity: string;

    constructor(id: number, name: string, email: string, lastActivity: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.lastActivity = lastActivity;
    }
}