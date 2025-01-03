import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../database/database.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
