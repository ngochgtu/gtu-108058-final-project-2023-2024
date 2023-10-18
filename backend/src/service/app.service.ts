import {Injectable, NotFoundException} from '@nestjs/common';
import {SkillType} from "../schema/SkillType.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateSkillTypeDto} from "../dto/CreateSkillType.dto";

@Injectable()
export class AppService {

    constructor(@InjectModel(SkillType.name) private skillTypeModel: Model<SkillType>) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async createSkillType(createSkillTypeDto: CreateSkillTypeDto): Promise<SkillType> {
        const [newStudent] = await Promise.all([new this.skillTypeModel(createSkillTypeDto)]);
        return newStudent.save();
    }

    async getAllSkillTypes(): Promise<SkillType[]> {
        const skillTypes = await this.skillTypeModel.find();
        if (!skillTypes || skillTypes.length == 0) {
            throw new NotFoundException('Skill types data not found!');
        }
        return skillTypes;
    }

}
