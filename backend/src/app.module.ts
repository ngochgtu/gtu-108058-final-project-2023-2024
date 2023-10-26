import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/User.Schema';
import { UsersService } from './service/users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://skills_verifier:ZyUSGsUUp7tTZ4d6@cluster0.7xtlism.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
