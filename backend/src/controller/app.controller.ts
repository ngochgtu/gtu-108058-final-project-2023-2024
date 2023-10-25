import {Body, Controller, Get, HttpStatus, Post, Query, Res} from '@nestjs/common';
import {AppService} from '../service/app.service';
import {OpenaiService} from "../service/openai.service";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";

@Controller("/api")
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly openaiService: OpenaiService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post("/skill")
    async createSkill(@Res() response, @Body() createSkillDto: CreateSkillDto) {
        try {
            const newSkill =
                await this.appService.createSkill(createSkillDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Skill has been created successfully',
                newStudent: newSkill,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Skill not created!',
                error: 'Bad Request',
            });
        }
    }

    @Get("/skills")
    getSkills(): Promise<Skill[]> {
        return this.appService.getSkills()
    }

    @Get("/ask")
    async getCompletion(@Query('prompt') prompt: string): Promise<string> {
        return this.openaiService.getCompletion(prompt);
    }

    @Get("/questions")
    async getQuestionsBySkills(@Query('skills') skills: string) {
        return this.appService.getQuestionsBySkills(skills.split(","));
    }
}
