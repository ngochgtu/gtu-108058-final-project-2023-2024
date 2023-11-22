import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { CreateUserQuestionDto } from 'src/dto/CreateUserQuestion.dto';
import { CreateUsersPoints } from 'src/dto/CreateUsersPoints.dto';
import { Question } from 'src/schema/Question.schema';
import { User } from 'src/schema/User.schema';
import { UserQuestion } from 'src/schema/UserQuestion.schema';
import { UsersPoints } from 'src/schema/UsersPoints.schema';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  private score:number = 0
  private email:string = ''
  private skill:Array<string> = []

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserQuestion.name) private userQuestionModel: Model<UserQuestion>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(UsersPoints.name) private usersPointsModel: Model<UsersPoints>,
  ) {}

  async checkUsersExistence(ComingEmail) {
    const saved = await this.findUserByEmail(ComingEmail);
    if (!saved) return false;
    if (saved.email == ComingEmail) {
      return true;
    }
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async createUserQuestion(createUserQuestionDto: CreateUserQuestionDto): Promise<UserQuestion> {
    const trueAnswer = await this.getQuestions(createUserQuestionDto.question_id)
    this.calculateScore(createUserQuestionDto.answer, trueAnswer[0].answer)
    this.email = createUserQuestionDto.email
    this.skill = trueAnswer[0].skill_names
    const [newUser] = await Promise.all([new this.userQuestionModel(createUserQuestionDto)]);
    return newUser.save();
  }

  async getQuestions(question_id: string): Promise<Question[]> {
    const questions = await this.questionModel.find({_id: question_id}).exec();
    if (!questions || questions.length == 0) {
      throw new NotFoundException('Questions data not found!');
    }
    return questions;
  }

  calculateScore(usersAnswer, correctAnswer){
    if(usersAnswer == correctAnswer){
      this.score++
      console.log(this.score)
    }
  }
  async getResult(){
    let result = {
      email: this.email,
      points: this.score,
      skill: this.skill
    }
    const savedResult = await this.saveResult(result)
    this.score = 0
    return savedResult
  }

  async saveResult(CreateUsersPoints: CreateUsersPoints): Promise<UsersPoints>{
    const [savedResult] = await Promise.all([new this.usersPointsModel(CreateUsersPoints),]);
    return savedResult.save();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (await this.checkUsersExistence(createUserDto.email)) {
      throw new Error('User already exists');
    } else {
      const password = encodePassword(createUserDto.password);
      const [newUser] = await Promise.all([
        new this.userModel({ ...createUserDto, password }),
      ]);
      return newUser.save();
    }
  }
}
