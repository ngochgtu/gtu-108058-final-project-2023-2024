import { Body, Controller, HttpStatus, Post, Res,Request ,Get} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { CreateUserQuestionDto } from 'src/dto/CreateUserQuestion.dto';
import { AppService } from 'src/service/app.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly appService: AppService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post('/user_question')
  async createUserQuestion(
    @Res() response,
    @Request() request,
    @Body() createUserQuestionDto: CreateUserQuestionDto,
  ) {
    try {
      const seasonId = request["session"].id
      const newUser = await this.usersService.createUserQuestion(createUserQuestionDto, seasonId);
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
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto, @Request() req) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      req.login(createUserDto, (err)=> err)
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `${err}!`,
        error: 'Bad Request',
      });
    }
  }

  @Get('/result')
  async getResult(@Request() request){
    const sessionId = request["session"].id
    this.appService.resetlocalCacheSessionData(sessionId);
    return await this.usersService.getResult(sessionId)
  }
}
