import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { CreateUserQuestionDto } from 'src/dto/CreateUserQuestion.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post('/user_question')
  async createUserQuestion(
    @Res() response,
    @Body() createUserQuestionDto: CreateUserQuestionDto,
  ) {
    try {
      const newUser = await this.usersService.createUserQuestion(
        createUserQuestionDto,
      );
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('/user')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `${err}!`,
        error: 'Bad Request',
      });
    }
  }
}
