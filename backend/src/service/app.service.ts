import {Injectable, NotFoundException} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";

@Injectable()
export class AppService {

    constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
        const [newStudent] = await Promise.all([new this.skillModel(createSkillDto)]);
        return newStudent.save();
    }

    async getSkills(): Promise<Skill[]> {
        const skills = await this.skillModel.find();
        if (!skills || skills.length == 0) {
            throw new NotFoundException('Skills data not found!');
        }
        return skills;
    }
}
