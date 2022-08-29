import { IBase } from "./base";

export interface IPost extends IBase{
    id: number,
    author: string,
    authorId: number,
    createdOn: string,
    title: string,
    description: string, 
    likes: number,
    comments: string[],
    media: string,
    categories: string[],
    canDelete: boolean
}