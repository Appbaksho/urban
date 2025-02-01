import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DatabaseService } from '../database/database.service';
import { UpdateProductDto } from './dto/update-product.dto';
import axios from 'axios';

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

  async findAll() {
    return await this.databaseService.product.findMany({
      include: {
        sizes: true,
        Category: true,
      },
      where:{
        continued:true
      }
    });
  }

  async findProduct(
    name: string,
    categoryId: string,
    price: number,
    limit: number,
    offset: number,
    categoryNameContains: string,
    size: string,
  ) {
    const query: any = {};
    if (name) {
      query.name = {
        contains: name,
      };
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (price) {
      query.price = price;
    }

    if (categoryNameContains) {
      query.category = {
        name: {
          contains: categoryNameContains,
        },
      };
    }

    if (size) {
      query.sizes = {
        some: {
          name: size,
        },
      };
    }

    const products = await this.databaseService.product.findMany({
      where: query,
      include: {
        sizes: true,
      },
      take: limit,
      skip: offset,
    });

    return products;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    // update sizes
    let sizes;
    if (updateProductDto.sizes.length > 0) {
      sizes = await updateProductDto.sizes.map((size) => ({
        where: {
          id: size.id,
        },
        update: {
          stock: size.stock,
        },
        create: {
          name: size.name,
          stock: size.stock,
        },
      }));
    } else {
      sizes = await this.databaseService.size.findMany({
        where: {
          productId: productId,
        },
      });
    }

    const previosuProduct = await this.databaseService.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        sizes: true,
      },
    });

    // update product
    const product = await this.databaseService.product.update({
      where: {
        id: productId,
      },
      data: {
        name: updateProductDto.name || previosuProduct.name,
        description:
          updateProductDto.description || previosuProduct.description,
        categoryId: updateProductDto.categoryId || previosuProduct.categoryId,
        imageUrl: updateProductDto.imageUrl || previosuProduct.imageUrl,
        sizes: {
          upsert: sizes,
        },
        details: updateProductDto.details || previosuProduct.details,
        sizeDescription:
          updateProductDto.sizeDescription || previosuProduct.sizeDescription,
        price: updateProductDto.price || previosuProduct.price,
        discountPrice: Number(updateProductDto.discountPrice) || previosuProduct.discountPrice
      },
      include: {
        sizes: true,
      },
    });

    return {
      message: 'Product updated successfully',
      product: product,
    };
  }

  async findOne(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id: id,
      },
      include: {
        sizes: true,
        Category: true,
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

  async getFavorites(customerId: string) {
    return this.databaseService.favorite.findMany({
      where: {
        customerId: customerId,
      },
      include: {
        customer: false,
        product: {
          include: {
            sizes: true,
          },
        },
      },
    });
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

  async uploadImage(file: Express.Multer.File) {
    //check if file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File is not an image');
    }
    // Upload image to imgbb
    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64'));
    console.log(formData);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const result = response.data;
    console.log(result);

    if (!result.success) {
      throw new BadRequestException(result);
    }

    return {
      message: 'Image uploaded successfully',
      imageUrl: result.data.url,
    };
  }

  async remove(id: string) {
    const product = await this.databaseService.product.update({data:{continued:false},where:{id:id}});
    return product;
  }
}
