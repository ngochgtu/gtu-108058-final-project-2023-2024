import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from 'src/dto/create.users.dto';
import { updateuserdto } from 'src/dto/update.user.dto';
import { IUsers } from 'src/interface/users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<IUsers>){}
    
    async createUser(createUserDto: CreateUsersDto): Promise<IUsers>
    {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async updateUser(UserId: string, UpdateUser: updateuserdto): Promise<IUsers> {
        const existingUser = await this.userModel.findByIdAndUpdate({_id : UserId}, UpdateUser ,{new: true});
        if(!existingUser) throw new NotFoundException(`User ${UserId} not found`)
        return existingUser
    }
    async deleteUser(UserId: string): Promise<IUsers>{
        const deletedUser = await this.userModel.findByIdAndRemove(UserId);
        if(!deletedUser) throw new NotFoundException(`User ${UserId} not found`)
        return deletedUser
    }
    async getAllUsers(): Promise<IUsers[]>{
        const users = await this.userModel.find();
        if(!users || users.length == 0) throw new NotFoundException('users data not found')
        return users
    }
    async getUser(UserId: string): Promise<IUsers> {
        const existingUser = await this.userModel.findById(UserId).exec();
        if (!existingUser) throw new NotFoundException(`User ${UserId} not found`);
        return existingUser;
      }

}
