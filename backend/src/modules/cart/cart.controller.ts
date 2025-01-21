import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { AccessTokenGuard } from 'src/middlewares/access-token.guard';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';
import { AddToCartDto, CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Req() request: Request) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.createIfNotFound(customerId);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async createMany(
    @Req() request: Request,
    @Body() createCartDto: CreateCartDto,
  ) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.createIfNotFound(customerId);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.createIfNotFound(customerId);
  }

  @Get('checked-out-all')
  async getCheckedOutAll() {
    return await this.cartService.getCheckedOutAll();
  }
  @Get('checked-out')
  @UseGuards(AccessTokenGuard)
  async getCheckedOut(@Req() request: Request) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return await this.cartService.getCheckedOut(customerId);
  }

  @Get('checked-out/:id')
  @UseGuards(AccessTokenGuard)
  async getCheckedOutById(@Param('id') id: string) {
    return await this.cartService.getOrderedSingleItem(id);
  }

  @Put(':orderItemId')
  async update(
    @Param('orderItemId') orderItemId: string,
    @Body() updateCartDto: UpdateCartItemDto,
  ) {
    return this.cartService.update(orderItemId, updateCartDto);
  }

  @Put('batch-update/:batchId')
  async batchUpdate(
    @Param('batchId') batchId: string,
    @Body() updateCartDto: UpdateCartItemDto,
  ) {
    return this.cartService.batchUpdate(batchId, updateCartDto);
  }

  @Get('batch/all/get')
  async getBatchAll() {
    return await this.cartService.getBatchAll();
  }

  @Get('batch/:batchId')
  async getBatch(@Param('batchId') batchId: string) {
    return await this.cartService.getBatch(batchId);
  }

  @Post('checkout')
  async checkout(@Body() checkoutDto: any, @Req() request: Request) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.checkout(customerId, checkoutDto);
  }

  @Post('add-to-cart')
  @UseGuards(AccessTokenGuard)
  async addToCart(@Body() addToCartDto: AddToCartDto, @Req() request: Request) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.addToCart(customerId, addToCartDto);
  }
  @Post('add-to-cart/batch')
  @UseGuards(AccessTokenGuard)
  async addToCartMany(
    @Body() addToCartDto: AddToCartDto[],
    @Req() request: Request,
  ) {
    const customerId =
      await this.firebaseService.getCustomerIdFromToken(request);
    return this.cartService.addToCartMany(customerId, addToCartDto);
  }

  @Delete(':orderItemId')
  async remove(@Param('orderItemId') orderItemId: string) {
    return this.cartService.remove(orderItemId);
  }

  @Get('fix/order-detail')
  async fixOrderDetail() {
    return this.cartService.fixOrderDetail();
  }
}
