import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/schema/User.schema";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersService: UsersService
    ){
        super()
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        done(null, user)
    }
    
    async deserializeUser(user:User, done: (err, user:User)=> void) {
        const userDB =  await this.usersService.findUserByEmail(user.email)
        return userDB ? done(null, userDB) : done(null, null)
    }
}