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
import {CreateUserDto} from "../dto/CreateUser.dto";
import {User} from "../schema/User.schema";
import {CreateUserQuestionDto} from "../dto/CreateUserQuestion.dto";
import {UserQuestion} from "../schema/UserQuestion.schema";

@Injectable()
export class AppService {

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>,
        @InjectModel(SkillType.name) private skillTypeModel: Model<SkillType>,
        @InjectModel(Question.name) private questionModel: Model<Question>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserQuestion.name) private userQuestionModel: Model<UserQuestion>,
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

    escapeRegExp(pattern) {
        return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
       shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
      }
    removeWordsFromArray(inputArray, patternsToRemove) {
        if (!Array.isArray(inputArray)) {
          throw new Error('Input is not an array');
        }
        const resultArray = inputArray.map((inputString) => {
          if (typeof inputString !== 'string') {
            throw new Error('Input in the array is not a string');
          }
      
          const pattern = new RegExp(patternsToRemove.map(this.escapeRegExp).join('|'), 'g');
      
          if (pattern.test(inputString)) {
            return inputString.replace(pattern, '');
          }
          return inputString;
        });
      
        return resultArray;
      }
      

    openai_question_to_dto = (openaiQuestion: string): CreateQuestionDto => {
        console.log("Row Question:", openaiQuestion)

        const createQuestionDto = new CreateQuestionDto();

        const questionParts = openaiQuestion.split(/\r?\n/);

        createQuestionDto.question = questionParts[0]

        const stringsToRemove = [
            'A)', 'B)', 'C)', 'D)', 'E)',
            'A.', 'B.', 'C.', 'D.', 'E.',
            '1.', '2.', '3.', '4.', '5.',
            '1)', '2)', '3)', '4)', '5)',
            '1', '2', '3', '4', '5',
          ];
        const fake_answers = []
        let answer = "";

        for (let i = 1; i < questionParts.length; i++) {
            const questionPart = questionParts[i].trim()
            if (questionPart && !questionPart.includes("Fake Answer:") && !questionPart.includes("Fake Answers:")) {

                // Check "True Answer"
                const answerKeyword = "Answer:"
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
                if (!temp) {
                    temp = this.getCorrectAnswer(i, questionPart, answerKeyword, questionParts)
                }

                if (temp) {
                    answer = temp
                } else {
                    fake_answers.push(questionPart)
                }
            }
        }
        if (!fake_answers.includes(answer)) {
            this.insterAtRandom(fake_answers, answer)
        }
        const updated_fake_answers = this.removeWordsFromArray(fake_answers,stringsToRemove)
        const ShaffledArray = this.shuffleArray(updated_fake_answers)
        createQuestionDto.answer = answer
        createQuestionDto.fake_answers = ShaffledArray
        createQuestionDto.session_id = "NoUser"

        console.log(updated_fake_answers)
        return createQuestionDto;
    }
    

    insterAtRandom = (array, element) => {
        const randomIndex = Math.floor(Math.random() * (array.length + 1));
        array.splice(randomIndex, 0, element);
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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const [newUser] = await Promise.all([new this.userModel(createUserDto)]);
        return newUser.save();
    }

    async createUserQuestion(createUserQuestionDto: CreateUserQuestionDto): Promise<User> {
        const [newUser] = await Promise.all([new this.userQuestionModel(createUserQuestionDto)]);
        return newUser.save();
    }

}
