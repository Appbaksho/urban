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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.databaseService.category.update({
      where: {
        id: id,
      },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
        imageUrl: updateCategoryDto.imageUrl,
        parentCategoryId: updateCategoryDto.parentCategoryId,
      },
    });
  }

  async getParentcategories() {
    return await this.databaseService.parentCategory.findMany({});
  }

  async createParentCategory(createCategoryDto: CreateCategoryDto) {
    const metadata = await this.databaseService.metadata.findFirst({});
    const category = await this.databaseService.parentCategory.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        imageUrl: createCategoryDto.imageUrl,
        metadataId: metadata.id,
      },
    });

    return {
      message: 'Parent category created successfully',
      category,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
