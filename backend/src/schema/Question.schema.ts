import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from "mongoose";

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
    @Prop()
    skill_names: string[];
    @Prop()
    question: string;
    @Prop()
    fake_answers: string[];
    @Prop()
    answer: string;
    @Prop()
    difficulty: string;
    // @Prop()
    // openai_question: string;
    @Prop()
    session_id: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);