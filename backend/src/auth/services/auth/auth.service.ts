import { Injectable , Inject } from '@nestjs/common';
import { AppService } from 'src/service/app.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('APP_SERVICE') private readonly appService:AppService,
    ){}

    async validateUser(username:string , password:string){
        console.log('inside of authservice')
        const [UserDb] = await this.appService.findUserByUsername(username)
        if (UserDb && UserDb.password === password){
            console.log('User Validation Success!')
            return UserDb
        }
    }
}
