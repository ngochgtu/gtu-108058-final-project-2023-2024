import { Controller ,Post,UseGuards,Session,Get, Request} from '@nestjs/common';
import { LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
    }

    @Get('')
    async getAuthSession(
        @Session() session:Record<string, any>
    ){
        console.log(session)
        console.log(session.id)
        session.authenticated = true
        return session
    }

}
