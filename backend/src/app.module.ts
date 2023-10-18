import {Module} from '@nestjs/common';
import {AppController} from './controller/app.controller';
import {AppService} from './service/app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {SkillType, SkillTypeSchema} from "./schema/SkillType.schema";
import {Skill, SkillSchema} from "./schema/Skill.schema";

@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://skills_verifier:ZyUSGsUUp7tTZ4d6@cluster0.7xtlism.mongodb.net/?retryWrites=true&w=majority',
    ),
        MongooseModule.forFeature([
            {name: SkillType.name, schema: SkillTypeSchema},
            {name: Skill.name, schema: SkillSchema}
        ])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
