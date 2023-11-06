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

@Module({
  imports: [MongooseModule.forFeature([
    {name: Skill.name, schema: SkillSchema},
    {name: SkillType.name, schema: SkillTypeSchema},
    {name: Question.name, schema: QuestionSchema},
    {name: User.name, schema: UserSchema},
    {name: UserQuestion.name, schema: UserQuestionSchema}
]),],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },{
    provide: 'APP_SERVICE',
    useClass: AppService
    },
    OpenaiService,
    SessionSerializer,
    LocalStrategy
]
})
export class AuthModule {}
