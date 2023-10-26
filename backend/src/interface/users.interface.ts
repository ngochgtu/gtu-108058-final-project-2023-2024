import { Document } from "mongoose";

export interface IUsers extends Document {
    name: string;
    email: string;
    password: string;
    skill: string;
    points: number;
}