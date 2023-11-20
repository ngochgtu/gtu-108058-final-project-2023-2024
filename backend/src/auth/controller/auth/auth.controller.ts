import { Controller ,Post,UseGuards,Session,Get, Request} from '@nestjs/common';
import { LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return req.user
    }

    @Post('logout')
    async logout(@Request() req){
        return req.logout(err => err)
    }

    @Get('')
    async getAuthSession(
        @Session() session:Record<string, any>
    ){
        session.authenticated = true
        return session
    }

}
