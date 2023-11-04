import {Module} from '@nestjs/common';
import {AppController} from './controller/app.controller';
import {AppService} from './service/app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Skill, SkillSchema} from "./schema/Skill.schema";
import {ScheduleModule} from "@nestjs/schedule";
import {TasksService} from "./service/task.service";
import {OpenaiService} from './service/openai.service';
import {Question, QuestionSchema} from "./schema/Question.schema";
import {SkillType, SkillTypeSchema} from "./schema/SkillType.schema";
import {User, UserSchema} from "./schema/User.schema";
import {UserQuestion, UserQuestionSchema} from "./schema/UserQuestion.schema";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://skills_verifier:ZyUSGsUUp7tTZ4d6@cluster0.7xtlism.mongodb.net/?retryWrites=true&w=majority',
    ),
        MongooseModule.forFeature([
            {name: Skill.name, schema: SkillSchema},
            {name: SkillType.name, schema: SkillTypeSchema},
            {name: Question.name, schema: QuestionSchema},
            {name: User.name, schema: UserSchema},
            {name: UserQuestion.name, schema: UserQuestionSchema}
        ]),
        ScheduleModule.forRoot(),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService, TasksService, OpenaiService],
})
export class AppModule {
}
