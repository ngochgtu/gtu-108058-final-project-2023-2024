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

    serializeUser(user: any, done: (err, user: User)=> void) {
        done(null, user)
    }

    deserializeUser(user:User, done: (err, user:User)=> void) {

        // const userDB = await this.appService.findUserById(user.id)
        // return userDB ? done(null, userDB) : done(null, null)
    }
}