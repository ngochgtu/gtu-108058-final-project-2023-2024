import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session'
import * as passport from 'passport'
const MongoStore = require('connect-mongo')

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({origin: 'http://localhost:3000', credentials: true,})
    app.use(session({
        secret: 'iyodaaraiyoramtavariaiyos',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://skills_verifier:ZyUSGsUUp7tTZ4d6@cluster0.7xtlism.mongodb.net/?retryWrites=true&w=majority',
            dbName: 'test', 
            autoRemove: 'native',
            touchAfter: 12 * 3600
          })
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    await app.listen(process.env.PORT || 3001);
}

bootstrap();
