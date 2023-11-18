import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from '../schema/Skill.schema';
import { CreateSkillDto } from '../dto/CreateSkill.dto';
import { OpenaiService } from './openai.service';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { Question } from '../schema/Question.schema';
import { CreateSkillTypeDto } from '../dto/CreateSkillType.dto';
import { SkillType } from '../schema/SkillType.schema';
import { UpdateSkillTypeDto } from '../dto/UpdateSkillType.dto';

@Injectable()
export class AppService {


  public GptArray:Array<{}> = []
  private counter: number = 0
  private skill: string[] = []
  private difficulty: string = ''


  constructor(
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
    @InjectModel(SkillType.name) private skillTypeModel: Model<SkillType>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private readonly openaiService: OpenaiService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createSkillType(
    createSkillTypeDto: CreateSkillTypeDto,
  ): Promise<SkillType> {
    const [newSkillType] = await Promise.all([
      new this.skillTypeModel(createSkillTypeDto),
    ]);
    return newSkillType.save();
  }

  async updateSkillType(
    skillTypeId: string,
    updateSkillTypeDto: UpdateSkillTypeDto,
  ): Promise<SkillType> {
    const existingStudent = await this.skillTypeModel.findByIdAndUpdate(
      skillTypeId,
      updateSkillTypeDto,
      { new: true },
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

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const [newQuestion] = await Promise.all([
      new this.questionModel(createQuestionDto),
    ]);
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
    const skillTypes = await this.skillTypeModel.find({ status: status });
    if (!skillTypes || skillTypes.length == 0) {
      throw new NotFoundException('Skill types data not found!');
    }
    return skillTypes;
  }


    async getQuestionsBySkills(skills: string[], difficulty: string) {
        const skillNames = []
        this.skill = skills
        this.difficulty = difficulty
        for (const skillId of skills) {

            const dbSkill = await this.skillModel.findById(new Types.ObjectId(skillId)).exec();
            if (!dbSkill) {
                throw new NotFoundException(`Skill #${skillId} not found`);
            }
            skillNames.push(dbSkill.name)
        }
        const openaiQuestion = await this.openaiService.getCompletion(`Generate an array of 10 skill verification questions for ${skillNames} with the following format:
        {
          "question": "Generate Question for skill ${skillNames}",
          "options": ["fake answer 1", "fake answer 2", "fake answer 3", "fake answer 4", "true answer for skill ${skillNames}"],
          "correctAnswer": "true answer for skill ${skillNames}",
          "difficulty": ${difficulty}
        }
        
        Ensure that the correct answer is randomly placed within the 'options' array for each question.`)
        
        this.GptArray = JSON.parse(openaiQuestion)
        const createQuestionDto = this.openai_question_to_dto(this.GptArray)
        createQuestionDto.skill_names = skillNames
        createQuestionDto.openai_question = openaiQuestion

        const dbQuestion = await this.createQuestion(createQuestionDto)

    return {
      _id: dbQuestion['_id'],
      question: dbQuestion.question,
      fake_answers: dbQuestion.fake_answers,
    };
  }

   

    openai_question_to_dto = (array): CreateQuestionDto => {
        const createQuestionDto = new CreateQuestionDto();
        
        if(this.counter <= 10){
            createQuestionDto.question = array[this.counter].question
            createQuestionDto.fake_answers = array[this.counter].options
            createQuestionDto.answer = array[this.counter].correctAnswer
            createQuestionDto.session_id = "NoUser"
            this.counter++
            return createQuestionDto
        }else{
            this.counter = 0
            this.GptArray.length = 0
            this.getQuestionsBySkills(this.skill, this.difficulty)
        }
    }
    


}
