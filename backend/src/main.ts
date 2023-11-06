import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({origin: "*"})
    app.use(session({
        secret: 'iyodaaraiyoramtavariaiyos',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    await app.listen(process.env.PORT || 3001);
}

bootstrap();
