import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {OpenaiService} from "./openai.service";

@Injectable()
export class TasksService {

    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly openaiService: OpenaiService) {
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    async run() {
        this.logger.log('Called every 10 seconds');
        let skillsText = await this.openaiService.getSkills()
        this.logger.log(skillsText);
    }
}