import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from "mongoose";

export type UserQuestionDocument = HydratedDocument<UserQuestion>;

@Schema()
export class UserQuestion {
    @Prop()
    email: string;

    @Prop()
    question_id: string;

    @Prop()
    answer: string;

    @Prop()
    sessionId: string;
}

export const UserQuestionSchema = SchemaFactory.createForClass(UserQuestion);