import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { CreateUserQuestionDto } from 'src/dto/CreateUserQuestion.dto';
import { User } from 'src/schema/User.schema';
import { UserQuestion } from 'src/schema/UserQuestion.schema';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserQuestion.name) private userQuestionModel: Model<UserQuestion>
    ) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const password = encodePassword(createUserDto.password)
        const [newUser] = await Promise.all([new this.userModel({...createUserDto, password})]);
        return newUser.save();
    }

    async findUserByUsername(email: string){
        return this.userModel.findOne({email}).exec()
    }

    async createUserQuestion(createUserQuestionDto: CreateUserQuestionDto): Promise<User> {
        const [newUser] = await Promise.all([new this.userQuestionModel(createUserQuestionDto)]);
        return newUser.save();
    }
}
