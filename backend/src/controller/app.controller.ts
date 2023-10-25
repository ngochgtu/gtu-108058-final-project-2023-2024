import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from '../service/app.service';
import {SkillType} from "../schema/SkillType.schema";
import {OpenaiService} from "../service/openai.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly openaiService: OpenaiService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("/skill_types")
    getSkillTypes(): Promise<SkillType[]> {
        return this.appService.getAllSkillTypes()
    }

    @Get("/skills")
    getSkills(): Promise<SkillType[]> {
        return this.appService.getSkills()
    }

    @Get("/ask")
    async getCompletion(@Query('prompt') prompt: string): Promise<string> {
        return this.openaiService.getCompletion(prompt);
    }
}
