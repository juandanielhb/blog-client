import { User } from "./user.model";

export class Comment {
    id!: number;
    content!: string;
    author!: User;
    
    constructor(){}
}