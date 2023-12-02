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

  private localCache = {}

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

  async createUserQuestion(createUserQuestionDto: CreateUserQuestionDto, sessionId): Promise<UserQuestion> {
    let session_data = this.localCache[sessionId];

    if (!session_data) {
        session_data = this.initlocalCacheSessionData()
        this.localCache[sessionId] = session_data
    }
    const trueAnswer = await this.getQuestions(createUserQuestionDto.question_id)
    this.calculateScore(createUserQuestionDto.answer, trueAnswer[0].answer, sessionId)
    this.localCache[sessionId].email = createUserQuestionDto.email
    this.localCache[sessionId].skill = trueAnswer[0].skill_names
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

  calculateScore(usersAnswer, correctAnswer, sessionId){
    if(usersAnswer == correctAnswer){
      this.localCache[sessionId].score += 1
    }
  }
  async getResult(sessionId){
    const savedResult = await this.saveResult({
      email: this.localCache[sessionId].email,
      points: this.localCache[sessionId].score,
      skill: this.localCache[sessionId].skill
    })
    this.localCache[sessionId].score = 0
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

  async getUsersStatsByEmail(email:string | Record<string, any>) {
     const emailValue = typeof email === 'object' ? email.email : email;

      const result = await this.usersPointsModel.find({ email: emailValue }).exec();
      const skillPointsArray: { skill: string; points: number; id: string }[] = [];

      result.forEach((entry) => {
        const skills = entry.skill.map((s: string) => s.toLowerCase()); 
        skills.forEach((skill) => {
          const existingSkillIndex = skillPointsArray.findIndex((item) => item.skill === skill);
    
          if (existingSkillIndex !== -1) {
            skillPointsArray[existingSkillIndex].points += entry.points;
          } else {
            skillPointsArray.push({ skill: skill, points: entry.points, id: entry._id.toString() });
          }
        });
      });
      return skillPointsArray;
  }
  

  initlocalCacheSessionData = () => {
    return {
      score: 0,
      email: '',
      skill: [],
    }
  }
}
