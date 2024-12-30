import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.databaseService.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        imageUrl: createCategoryDto.imageUrl,
        parentCategoryId: createCategoryDto.parentCategoryId,
      },
    });

    return {
      message: 'Category created successfully',
      category,
    };
  }

  async findAll() {
    const categories = await this.databaseService.category.findMany({});
    return categories;
  }

  async findOne(id: string) {
    return await this.databaseService.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
