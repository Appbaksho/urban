import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../database/database.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
