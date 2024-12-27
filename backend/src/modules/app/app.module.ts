import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { FirebaseModule } from '../firebase/firebase.module';
import { CustomerModule } from '../customer/customer.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';
@Module({
  imports: [
    //ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URL),MulterModule.register({ dest: './uploads', }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CustomerModule,
    FirebaseModule,
    CategoryModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
