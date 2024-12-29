import { Injectable } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { DatabaseService } from '../database/database.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { AddToCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createIfNotFound(customerId: string) {
    const cart = await this.databaseService.cart.findUnique({
      where: {
        customerId: customerId,
      },
      include: {
        items: {
          include: {
            size: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (cart) {
      return cart;
    }

    return this.databaseService.cart.create({
      data: {
        customerId: customerId,
      },
      include: {
        items: {
          include: {
            size: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  async addToCart(customerId: string, addToCartDto: AddToCartDto) {
    const cart = await this.createIfNotFound(customerId);
    const cartItem = await this.databaseService.orderItem.create({
      data: {
        cartId: cart.id,
        sizeId: addToCartDto.sizeId,
        quantity: addToCartDto.quantity,
      },
    });

    return {
      message: 'Product added to cart',
      orderItem: cartItem,
    };
  }

  async update(orderItemId: string, updateCartItemDto: UpdateCartItemDto) {
    const updatedCartItem = this.databaseService.orderItem.update({
      where: {
        id: orderItemId,
      },
      data: updateCartItemDto,
    });
    return {
      message: 'Cart item updated',
      orderItem: updatedCartItem,
    };
  }

  async checkout(customerId: string, checkoutDto: any) {
    const cart = await this.createIfNotFound(customerId);
    cart.items.map(async (item) => {
      await this.databaseService.transactionHistory.create({
        data: {
          orderItemId: item.id,
          paymentMethod: checkoutDto.paymentMethod,
          amount:
            item.quantity *
            (item.size.product.discountPrice || item.size.product.price),
        },
      });
      await this.databaseService.orderItem.update({
        where: {
          id: item.id,
        },
        data: {
          isCheckedOut: true,
          paymentStatus: PaymentStatus.PAID,
          orderStatus: OrderStatus.CHECKED_OUT,
        },
      });
    });

    return {
      message: 'Cart checked out',
    };
  }

  async remove(cartItemId: string) {
    await this.databaseService.orderItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return {
      message: 'Cart item removed',
    };
  }
}
