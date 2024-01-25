import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SavedResult{
    @Prop()
    saved_result: Array<{
        skill_names: string[];
        question: string;
        fake_answers: string[];
        answer: string;
        difficulty: string;
        session_id: string;
        usersAnswers: string | null; 
      }>;
    @Prop()
    sessionId: string;  
    @Prop()
    email: string;  
    @Prop()
    skill: Array<string>;  
    @Prop()
    points: number;  
    @Prop()
    counter: number;  

};
export const SavedResultSchema = SchemaFactory.createForClass(SavedResult);