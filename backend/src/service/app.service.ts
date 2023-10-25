import {Injectable, NotFoundException} from '@nestjs/common';
import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";
import {OpenaiService} from "./openai.service";
import {CreateQuestionDto} from "../dto/CreateQuestion.dto";
import {Question} from "../schema/Question.schema";
import {CreateSkillTypeDto} from "../dto/CreateSkillType.dto";
import {SkillType} from "../schema/SkillType.schema";
import {UpdateSkillTypeDto} from "../dto/UpdateSkillType.dto";

@Injectable()
export class AppService {

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>,
        @InjectModel(SkillType.name) private skillTypeModel: Model<SkillType>,
        @InjectModel(Question.name) private questionModel: Model<Question>,
        private readonly openaiService: OpenaiService
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async createSkillType(createSkillTypeDto: CreateSkillTypeDto): Promise<SkillType> {
        const [newSkillType] = await Promise.all([new this.skillTypeModel(createSkillTypeDto)]);
        return newSkillType.save();
    }

    async updateSkillType(
        skillTypeId: string,
        updateSkillTypeDto: UpdateSkillTypeDto,
    ): Promise<SkillType> {
        const existingStudent = await this.skillTypeModel.findByIdAndUpdate(
            skillTypeId,
            updateSkillTypeDto,
            {new: true},
        );
        if (!existingStudent) {
            throw new NotFoundException(`Skill type #${skillTypeId} not found`);
        }
        return existingStudent;
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

    async getSkillTypes(status: string): Promise<SkillType[]> {
        const skillTypes = await this.skillTypeModel.find({status: status});
        if (!skillTypes || skillTypes.length == 0) {
            throw new NotFoundException('Skill types data not found!');
        }
        return skillTypes;
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

        const openaiQuestion = await this.openaiService.getCompletion(`Generate Question, fake 4 answer and true one answer for skill ${skillNames}`)

        const createQuestionDto = this.openai_question_to_dto(openaiQuestion)
        createQuestionDto.skill_names = skillNames
        createQuestionDto.openai_question = openaiQuestion

        const dbQuestion = await this.createQuestion(createQuestionDto)

        return {
            _id: dbQuestion["_id"],
            question: dbQuestion.question,
            fake_answers: dbQuestion.fake_answers
        }
    }


    openai_question_to_dto = (openaiQuestion: string): CreateQuestionDto => {
        console.log("Row Question:", openaiQuestion)

        const createQuestionDto = new CreateQuestionDto();

        const questionParts = openaiQuestion.split(/\r?\n/);

        createQuestionDto.question = questionParts[0]

        const fake_answers = []
        let answer = "";

        for (let i = 1; i < questionParts.length; i++) {
            const questionPart = questionParts[i].trim()
            if (questionPart && !questionPart.includes("Fake Answer:") && !questionPart.includes("Fake Answers:")) {

                // Check "True Answer"
                const trueAnswer = "True Answer:"
                const trueAnswer2 = "True answer:"
                const correctAnswer = "Correct Answer"
                const correctAnswer2 = "Correct answer:"

                let temp = this.getCorrectAnswer(i, questionPart, trueAnswer, questionParts)
                if (!temp) {
                    temp = this.getCorrectAnswer(i, questionPart, trueAnswer2, questionParts)
                }
                if (!temp) {
                    temp = this.getCorrectAnswer(i, questionPart, correctAnswer, questionParts)
                }
                if (!temp) {
                    temp = this.getCorrectAnswer(i, questionPart, correctAnswer2, questionParts)
                }

                if (temp) {
                    answer = temp
                } else {
                    fake_answers.push(questionPart)
                }
            }
        }
        if (!fake_answers.includes(answer)) {
            fake_answers.push(answer)
        }
        createQuestionDto.answer = answer
        createQuestionDto.fake_answers = fake_answers
        createQuestionDto.session_id = "NoUser"

        console.log(createQuestionDto)
        return createQuestionDto;
    }

    getCorrectAnswer = (i: number, questionPart: string, keyWord: string, questionParts: string[]) => {
        let answer = null
        if (questionPart.startsWith(keyWord) || questionPart.includes(keyWord)) {
            if (i + 1 < questionParts.length) {
                answer = questionParts[i + 1]
            } else {
                answer = questionPart.substring(questionPart.indexOf(keyWord) + keyWord.length)
            }
        }
        return answer
    }
}
