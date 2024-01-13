import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User, UserSchema } from 'src/schema/User.schema';
import { UserQuestion, UserQuestionSchema } from 'src/schema/UserQuestion.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/schema/Skill.schema';
import { SkillType, SkillTypeSchema } from 'src/schema/SkillType.schema';
import { Question, QuestionSchema } from 'src/schema/Question.schema';
import { UsersPointsSchema, UsersPoints } from 'src/schema/UsersPoints.schema';
import { AppService } from 'src/service/app.service';
import { OpenaiService } from 'src/service/openai.service';
import { SavedResult, SavedResultSchema } from 'src/schema/SavedResults.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Skill.name, schema: SkillSchema},
    {name: SkillType.name, schema: SkillTypeSchema},
    {name: Question.name, schema: QuestionSchema},
    {name: User.name, schema: UserSchema},
    {name: UserQuestion.name, schema: UserQuestionSchema},
    {name: UsersPoints.name, schema: UsersPointsSchema},
    {name: SavedResult.name, schema: SavedResultSchema},
  ]),],
  controllers: [UsersController],
  providers: [UsersService, AppService,OpenaiService]
})
export class UsersModule {}
