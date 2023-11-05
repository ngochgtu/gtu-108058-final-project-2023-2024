import { Injectable , Inject } from '@nestjs/common';
import { AppService } from 'src/service/app.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('APP_SERVICE') private readonly appService:AppService,
    ){}

    async validateUser(email:string , password:string){
        console.log('inside of authservice')
        const UserDb = await this.appService.findUserByUsername(email)
        if (UserDb){
            console.log(UserDb)
            const matched = comparePasswords(password, UserDb.password)
            if( matched){
            console.log('User Validation Success!')
            return UserDb
            }else{
                console.log('password do not matched')
                return null
            }

        }
        console.log('user validation failed')
        return null
    }
}
