import { Body, Controller, HttpStatus, Post, Res,Request ,Get, UseGuards, Query} from '@nestjs/common';
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

  @Get('/shared')
  async getShared(@Res() response, @Query('info') info: string) {
    try {
      const data = await this.usersService.getShared(info);
      return response.status(HttpStatus.CREATED).json({ data });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
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

  @Get('/resultHistory')
  async getResultHistory(@Request() request){
    const sessionId = request["session"].id
    // const sessionId = 'NvVajFuq6cY5Jm8ilAPQ07AyzMea4nod'
    return await this.usersService.getResultHistory(sessionId)
  }

  @Post('/UsersInfo')
  async getUsersInfo(@Res() response, @Body() email: string) {
    try{
      const usersInfo = await this.usersService.getUsersStatsByEmail(email)
      return response.status(HttpStatus.CREATED).json(usersInfo);
    }catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `${err}!`,
        error: 'Bad Request',
      });
    }
  }
}
