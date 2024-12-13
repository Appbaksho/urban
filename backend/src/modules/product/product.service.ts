import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.databaseService.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        categoryId: createProductDto.categoryId,
      },
    });

    createProductDto.variants.forEach(async (variant) => {
      await this.databaseService.productVariant.create({
        data: {
          additionalName: variant.additionalName,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          imageUrl: variant.imageUrl,
          price: variant.price,
          gender: variant.gender,
          productId: product.id,
        },
      });
    });

    const productWithVariants = await this.databaseService.product.findUnique({
      where: {
        id: product.id,
      },
      include: {
        variants: true,
      },
    });

    return {
      message: 'Product created successfully',
      product: productWithVariants,
    };
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id: id,
      },
      include: {
        variants: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
