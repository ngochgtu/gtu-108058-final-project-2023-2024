import { Controller ,Post,UseGuards,Session,Get, Request, Req, Res} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return req.user
    }
    
    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req, @Res() res) {
            req.logout((err) => {
              if (err) {
                return (err + 'logout unsuccessful' + (res.status(500).send()));
              }else {
                res.clearCookie('connect.sid');
                res.redirect('/');
                return 'logout successful';
              }
            });
    }

    @Get('')
    async getAuthSession(
        @Session() session:Record<string, any>
    ){
        session.authenticated = true
        return session
    }

}
