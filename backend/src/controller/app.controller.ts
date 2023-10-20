import {Controller, Get} from '@nestjs/common';
import {AppService} from '../service/app.service';
import {SkillType} from "../schema/SkillType.schema";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
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
}
