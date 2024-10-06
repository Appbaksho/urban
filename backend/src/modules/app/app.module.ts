import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { FirebaseModule } from '../firebase/firebase.module';
import { CustomerModule } from '../customer/customer.module';
@Module({
  imports: [
    //ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URL),MulterModule.register({ dest: './uploads', }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CustomerModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
