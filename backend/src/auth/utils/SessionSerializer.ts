import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/schema/User.schema";
import { AppService } from "src/service/app.service";

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('APP_SERVICE') private readonly appService: AppService
    ){
        super()
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        console.log('serialized')
        done(null, user)
    }
    
    async deserializeUser(user:User, done: (err, user:User)=> void) {
        console.log('deserialized')
        const userDB =  await this.appService.findUserById(user.email)
        return userDB ? done(null, userDB) : done(null, null)
    }
}