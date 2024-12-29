import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
        imageUrl: createProductDto.imageUrl,
        sizes: {
          create: createProductDto.sizes.map((size) => ({
            name: size.name,
            stock: size.stock,
          })),
        },
        details: createProductDto.details,
        sizeDescription: createProductDto.sizeDescription,
        price: createProductDto.price,
      },
    });

    const productWithSizes = await this.databaseService.product.findUnique({
      where: {
        id: product.id,
      },
      include: {
        sizes: true,
      },
    });

    return {
      message: 'Product created successfully',
      product: productWithSizes,
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
        sizes: true,
      },
    });
  }

  async addToFavorite(productId: string, customerId: string) {
    const favorite = await this.databaseService.favorite.create({
      data: {
        productId: productId,
        customerId: customerId,
      },
      include: {
        product: {
          include: {
            sizes: true,
          },
        },
      },
    });

    return {
      message: 'Product added to favorite successfully',
      favorite: favorite,
    };
  }

  //remove from favorite
  async removeFromFavorite(productId: string, customerId: string) {
    const favorite = await this.databaseService.favorite.deleteMany({
      where: {
        productId: productId,
        customerId: customerId,
      },
    });

    return {
      message: 'Product removed from favorite successfully',
      favorite: favorite,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
