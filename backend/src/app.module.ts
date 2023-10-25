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

@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://skills_verifier:ZyUSGsUUp7tTZ4d6@cluster0.7xtlism.mongodb.net/?retryWrites=true&w=majority',
    ),
        MongooseModule.forFeature([
            {name: Skill.name, schema: SkillSchema},
            {name: SkillType.name, schema: SkillTypeSchema},
            {name: Question.name, schema: QuestionSchema}
        ]),
        ScheduleModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService, TasksService, OpenaiService],
})
export class AppModule {
}
