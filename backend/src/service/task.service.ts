import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';

@Injectable()
export class TasksService {

    private readonly logger = new Logger(TasksService.name);

    @Cron(CronExpression.EVERY_10_SECONDS)
    async run() {
        this.logger.log('Called every 10 seconds');
    }
}