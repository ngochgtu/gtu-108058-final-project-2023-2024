import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UsersPoints {
    @Prop()
    email: string;
    @Prop()
    points: number;
    @Prop()
    skill: Array<string>
}

export const UsersPointsSchema = SchemaFactory.createForClass(UsersPoints);