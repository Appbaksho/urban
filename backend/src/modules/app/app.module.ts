import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import {FirebaseModule} from "../firebase/firebase.module";
@Module({
  imports: [
    //ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URL),MulterModule.register({ dest: './uploads', }),
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
