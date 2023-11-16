import {Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards} from '@nestjs/common';
import {AppService} from '../service/app.service';
import {OpenaiService} from "../service/openai.service";
import {Skill} from "../schema/Skill.schema";
import {CreateSkillDto} from "../dto/CreateSkill.dto";
import {CreateSkillTypeDto} from "../dto/CreateSkillType.dto";
import {UpdateSkillTypeDto} from "../dto/UpdateSkillType.dto";
import {SkillType} from "../schema/SkillType.schema";
import {CreateUserDto} from "../dto/CreateUser.dto";
import {CreateUserQuestionDto} from "../dto/CreateUserQuestion.dto";
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

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

    // @UseGuards(AuthenticatedGuard)
    @Post("/skill")
    async createSkill(@Res() response, @Body() createSkillDto: CreateSkillDto) {
        try {
            const newSkill = await this.appService.createSkill(createSkillDto);
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

    // @UseGuards(AuthenticatedGuard)
    @Post("/skill_type")
    async createSkillType(@Res() response, @Body() createSkillTypeDto: CreateSkillTypeDto) {
        try {
            const newSkillType = await this.appService.createSkillType(createSkillTypeDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Skill has been created successfully',
                newStudent: newSkillType,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Skill not created!',
                error: 'Bad Request',
            });
        }
    }

    // @UseGuards(AuthenticatedGuard)
    @Put('/skill_type/:id')
    async updateSkillType(@Res() response, @Param('id') id: string, @Body() updateStudentDto: UpdateSkillTypeDto,
    ) {
        try {
            const existingSkillType = await this.appService.updateSkillType(
                id,
                updateStudentDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'Skill type has been successfully updated',
                existingSkillType,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    // @UseGuards(AuthenticatedGuard)
    @Get("/skills")
    getSkills(): Promise<Skill[]> {
        return this.appService.getSkills()
    }

    // @UseGuards(AuthenticatedGuard)
    @Get("/skill_types/:status")
    getSkillTypes(@Param('status') status: string): Promise<SkillType[]> {
        return this.appService.getSkillTypes(status)
    }

    // @UseGuards(AuthenticatedGuard)
    @Get("/ask")
    async getCompletion(@Query('prompt') prompt: string): Promise<string> {
        return this.openaiService.getCompletion(prompt);
    }
    // @UseGuards(AuthenticatedGuard)
    @Get("/questions")
    async getQuestionsBySkills(@Query('skills') skills: string , @Query('difficulty') difficulty: string ) {
        return this.appService.getQuestionsBySkills(skills.split(","), difficulty);
    }    
    @Get('/result')
    async getNextQuestion(){
        return this.appService.openai_question_to_dto(this.appService.array)
    }
}
