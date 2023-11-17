import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User, UserSchema } from 'src/schema/User.schema';
import { UserQuestion, UserQuestionSchema } from 'src/schema/UserQuestion.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/schema/Skill.schema';
import { SkillType, SkillTypeSchema } from 'src/schema/SkillType.schema';
import { Question, QuestionSchema } from 'src/schema/Question.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Skill.name, schema: SkillSchema},
    {name: SkillType.name, schema: SkillTypeSchema},
    {name: Question.name, schema: QuestionSchema},
    {name: User.name, schema: UserSchema},
    {name: UserQuestion.name, schema: UserQuestionSchema}
]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}