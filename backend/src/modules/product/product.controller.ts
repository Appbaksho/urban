import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Put('add-to-favorite/:productId')
  async addToFavorite(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const customerId = await this.firebaseService.getCustomerIdFromToken(req);
    return this.productService.addToFavorite(productId, customerId);
  }

  // remove from favorite
  @Delete('remove-from-favorite/:productId')
  async removeFromFavorite(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const customerId = await this.firebaseService.getCustomerIdFromToken(req);
    return this.productService.removeFromFavorite(productId, customerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
