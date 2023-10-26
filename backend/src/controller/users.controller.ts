import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Res,
  Param,
  HttpStatus
} from '@nestjs/common';
import { CreateUsersDto } from 'src/dto/create.users.dto';
import { updateuserdto } from 'src/dto/update.user.dto';
import { UsersService } from 'src/service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}

  @Post()
  async CreateUsers(@Res() response, @Body() CreateUsersDto: CreateUsersDto) {
    try {
        const newUser = await this.UsersService.createUser(CreateUsersDto)
        return response.status(HttpStatus.CREATED).json({
            message: 'User has been created successfully',
            newUser
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error creating user',
            error: error.message
        })
    }
  }

  @Get()
  async GetUsers(@Res() response) {
    try {
        const users = await this.UsersService.getAllUsers()
        return response.status(HttpStatus.OK).json({
            message: 'Users data retrieved successfully',
            users
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error getting users',
            error: error.message
        })
    }
  }
  @Get('/:id')
  async GetUser(@Res() response, @Param('id') userId: string) {
    try {
        const user = await this.UsersService.getUser(userId)
        return response.status(HttpStatus.OK).json({
            message: 'User data retrieved successfully',
            user
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error getting user',
            error: error.message
        })
    }
  }
  @Put('/:id')
  async UpdateUsers(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateuserdto: updateuserdto,
  ) {
    try {
        const updatedUser = await this.UsersService.updateUser(userId, updateuserdto)
        return response.status(HttpStatus.OK).json({
            message: 'User has been updated successfully',
            updatedUser
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error updating user',
            error: error.message
        })
    }
  }
  @Delete('/:id')
  async DeleteUsers(@Res() response, @Param('id') userId: string) {
    try {
        const deletedUser = await this.UsersService.deleteUser(userId)
        return response.status(HttpStatus.OK).json({
            message: 'User has been deleted successfully',
            deletedUser
        })
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error deleting user',
            error: error.message
        })
    }
  }
}
