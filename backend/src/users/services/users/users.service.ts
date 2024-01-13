import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { CreateUserQuestionDto } from 'src/dto/CreateUserQuestion.dto';
import { CreateUsersPoints } from 'src/dto/CreateUsersPoints.dto';
import { CreateSavedResult } from 'src/dto/SavedResults.dto';
import { Question } from 'src/schema/Question.schema';
import { SavedResult } from 'src/schema/SavedResults.schema';
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
    @InjectModel(SavedResult.name) private SavedResultModel: Model<SavedResult>,
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
    const [userAnswer] = await Promise.all([new this.userQuestionModel({...createUserQuestionDto, sessionId})]);
    return userAnswer.save();
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
    const [savedResult] = await Promise.all([new this.usersPointsModel({saved_result: CreateUsersPoints}),]);
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

  async createResultHistory(createSavedResult: CreateSavedResult): Promise<string> {
    const newSavedResult = new this.SavedResultModel({...createSavedResult});
    
    try {
      const savedDocument = await newSavedResult.save();
      const savedDocumentId = savedDocument._id.toString();
      return savedDocumentId;
    } catch (error) {
      console.error("Error saving document:", error);
      throw error; 
    }
  }

  async getShared(id: string){
    const result = await this.SavedResultModel.findById(id).lean().exec();
    return result
  }

  async getResultHistory(sessionId) {
    const result = await this.questionModel.find({ session_id: sessionId }).lean().exec();
  const userAnswers = await this.userQuestionModel.find({ sessionId: sessionId }).lean().exec();
  
    // Create an array to store separated data
    const separatedData = [];
  
    // Iterate through the input array
    result.forEach(item => {
      const skillName = item.skill_names[0]; // Assuming each item has only one skill name
  
      // If the skill name doesn't exist in the separatedData object, create an empty array
      if (!separatedData[skillName]) {
        separatedData[skillName] = [];
      }
  
      // Push the item to the corresponding skill name array
      separatedData[skillName].push(item);
    });
  
    const separatedArray = Object.values(separatedData);
  
    // Retrieve the last array
    const lastSeparatedArray = separatedArray[separatedArray.length - 1];
  
    const data = [lastSeparatedArray, userAnswers];
  
    const combinedArray = data[0].map(question => {
      const answerObject = data[1].find(answer => answer.question_id.toString() === question._id.toString());
      const mergedObject = { ...question, usersAnswers: answerObject ? answerObject.answer : null };
      return mergedObject;
    });

    const createSavedResult = {
      saved_result: combinedArray,
      sessionId: sessionId
    };
    
    const savedResultId = await this.createResultHistory(createSavedResult);
    
    return [combinedArray, savedResultId];
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
