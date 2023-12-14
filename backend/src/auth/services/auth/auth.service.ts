import { Injectable , Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersService:UsersService,
    ){}

    async validateUser(email:string , password:string){
        const UserDb = await this.usersService.findUserByEmail(email)
        if (UserDb){
            const matched = comparePasswords(password, UserDb.password)
            if( matched){
            return UserDb
            }else{
                return null
            }

        }
        return null
    }
}
