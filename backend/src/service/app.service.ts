import {Injectable, NotFoundException} from '@nestjs/common';
import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";
import {OpenaiService} from "./openai.service";
import {CreateQuestionDto} from "../dto/CreateQuestion.dto";
import {Question} from "../schema/Question.schema";

@Injectable()
export class AppService {

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>,
        @InjectModel(Question.name) private questionModel: Model<Question>,
        private readonly openaiService: OpenaiService
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
        const [newSkill] = await Promise.all([new this.skillModel(createSkillDto)]);
        return newSkill.save();
    }

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const [newQuestion] = await Promise.all([new this.questionModel(createQuestionDto)]);
        return newQuestion.save();
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

        const question = await this.openaiService.getCompletion(`Generate Question, fake 4 answer and true one answer for skill ${skillNames}`)

        const createQuestionDto = new CreateQuestionDto();
        createQuestionDto.skill_names = skillNames
        createQuestionDto.question = question
        createQuestionDto.answer = question.substring(question.indexOf("True Answer:"))

        return await this.createQuestion(createQuestionDto)
    }
}
