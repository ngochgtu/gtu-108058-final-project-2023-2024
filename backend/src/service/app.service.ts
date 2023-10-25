import {Injectable, NotFoundException} from '@nestjs/common';
import {Model, Schema, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";
import {OpenaiService} from "./openai.service";

@Injectable()
export class AppService {

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>,
        private readonly openaiService: OpenaiService
    ) {
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

    async getQuestionsBySkills(skills: string[]) {
        const skillNames = []
        for (const skillId of skills) {

            const dbSkill = await this.skillModel.findById(new Types.ObjectId(skillId)).exec();
            if (!dbSkill) {
                throw new NotFoundException(`Skill #${skillId} not found`);
            }
            skillNames.push(dbSkill.name)
        }

        return [{
            "id": 1,
            "question": await this.openaiService.getCompletion(`Generate Question, fake 4 answer and true one answer for skill ${skillNames}`)
        }]
    }
}
