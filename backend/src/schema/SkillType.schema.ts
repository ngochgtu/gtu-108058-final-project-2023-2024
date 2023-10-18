import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from "mongoose";

export type SkillTypeDocument = HydratedDocument<SkillType>;

@Schema()
export class SkillType {
    @Prop()
    name: string;
}

export const SkillTypeSchema = SchemaFactory.createForClass(SkillType);