import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import {PassportModule} from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { AppService } from 'src/service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/schema/Skill.schema';
import { SkillType, SkillTypeSchema } from 'src/schema/SkillType.schema';
import { Question, QuestionSchema } from 'src/schema/Question.schema';
import { User, UserSchema } from 'src/schema/User.schema';
import { UserQuestion, UserQuestionSchema } from 'src/schema/UserQuestion.schema';
import { OpenaiService } from 'src/service/openai.service';
import { SessionSerializer } from './utils/SessionSerializer';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersPoints, UsersPointsSchema } from 'src/schema/UsersPoints.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Skill.name, schema: SkillSchema},
    {name: SkillType.name, schema: SkillTypeSchema},
    {name: Question.name, schema: QuestionSchema},
    {name: User.name, schema: UserSchema},
    {name: UserQuestion.name, schema: UserQuestionSchema}, 
    {name: UsersPoints.name, schema: UsersPointsSchema},
]),],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },{
    provide: 'USERS_SERVICE',
    useClass: UsersService
    },
    OpenaiService,
    SessionSerializer,
    LocalStrategy
]
})
export class AuthModule {}
