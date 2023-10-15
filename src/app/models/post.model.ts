import { User } from "./user.model";

export class Post {
    id!: number;
    title!: string;
    content!: string;
    author!: User;
    comments!: Comment[];

    constructor(){}
}