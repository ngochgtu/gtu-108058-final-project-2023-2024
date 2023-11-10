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
        console.log('serialized')
        done(null, user)
    }
    
    async deserializeUser(user:User, done: (err, user:User)=> void) {
        console.log('deserialized')
        const userDB =  await this.usersService.findUserByUsername(user.email)
        return userDB ? done(null, userDB) : done(null, null)
    }
}