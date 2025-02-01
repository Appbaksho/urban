import { Injectable } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { DatabaseService } from '../database/database.service';
import { DeliveryStatus, OrderStatus, PaymentStatus } from '@prisma/client';
import { AddToCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createIfNotFound(customerId: string) {
    try {
      const cart = await this.databaseService.cart.findUnique({
        where: { customerId },
        include: {
          items: {
            where: {
              isCheckedOut: false,
            },
            include: {
              orderDetail: true,
              size: {
                include: { product: true },
              },
            },
          },
        },
      });

      if (cart) {
        return cart;
      }

      return await this.databaseService.cart.create({
        data: { customerId },
        include: {
          items: {
            include: {
              orderDetail: true,
              size: {
                include: { product: true },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in createIfNotFound:', error);
      throw new Error('Failed to retrieve or create cart.');
    }
  }

  async getCheckedOut(customerId: string) {
    try {
      const cart = await this.databaseService.cart.findUnique({
        where: { customerId },
        include: {
          items: {
            where: {
              isCheckedOut: true,
            },
            include: {
              orderDetail: true,
              size: {
                include: { product: true },
              },
            },
          },
        },
      });

      if (cart) {
        console.log(cart);
        return cart;
      }

      return await this.databaseService.cart.create({
        data: { customerId },
        include: {
          items: {
            include: {
              orderDetail: true,
              size: {
                include: { product: true },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in createIfNotFound:', error);
      throw new Error('Failed to retrieve or create cart.');
    }
  }

  async getCheckedOutAll() {
    try {
      const cart = await this.databaseService.cart.findMany({
        include: {
          items: {
            where: {
              isCheckedOut: true,
            },
            include: {
              orderDetail: true,
              size: {
                include: { product: true },
              },
            },
          },
        },
      });

      if (cart) {
        console.log(cart);
        return cart;
      }
      return {
        message: 'No checked out items',
      };
    } catch (error) {
      console.error('Error in createIfNotFound:', error);
      throw new Error('Failed to retrieve or create cart.');
    }
  }

  async getOrderedSingleItem(orderItemId: string) {
    try {
      const cartItemPre = await this.databaseService.orderItem.findUnique({
        where: { id: orderItemId },
      });
      const items = await this.databaseService.orderItem.findMany({
        where: { batchId: cartItemPre.batchId },
      });
      const cartItem = await this.databaseService.orderItem.findUnique({
        where: { id: orderItemId },
        include: {
          orderDetail: true,
          cart: {
            include: {
              customer: true,
              items: {
                include: {
                  orderDetail: true,
                  size: {
                    include: { product: true },
                  },
                },
                where: {
                  batchId: cartItemPre.batchId,
                },
              },
            },
          },
          size: {
            include: { product: true },
          },
        },
      });

      if (cartItem) {
        return cartItem;
      }

      throw new Error('Cart item not found');
    } catch (error) {
      console.error('Error in getOrderedSingleItem:', error);
      throw new Error('Failed to retrieve cart item.');
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  async addToCart(customerId: string, addToCartDto: AddToCartDto) {
    const cart = await this.createIfNotFound(customerId);
    let batchId = '';
    if (cart.items.length > 0) {
      batchId = cart.items[0].batchId;
    } else {
      batchId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }

    const cartItem = await this.databaseService.orderItem.create({
      data: {
        cartId: cart.id,
        sizeId: addToCartDto.sizeId,
        quantity: addToCartDto.quantity,
        batchId: batchId,
      },
    });

    const size = await this.databaseService.size.findUnique({
      where: {
        id: addToCartDto.sizeId,
      },
      include: {
        product: true,
      },
    });

    await this.databaseService.orderDetail.create({
      data: {
        orderItemId: cartItem.id,
        size: size.name,
        quantity: addToCartDto.quantity,
        price: size.product.discountPrice || size.product.price,
        productName: size.product.name,
        imageUrl: size.product.imageUrl[0],
      },
    });

    return {
      message: 'Product added to cart',
      orderItem: cartItem,
    };
  }

  async addToCartMany(customerId: string, addToCartDto: AddToCartDto[]) {
    const cart = await this.createIfNotFound(customerId);
    let batchId = '';
    if (cart.items.length > 0) {
      batchId = cart.items[0].batchId;
    } else {
      batchId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
    const processed = addToCartDto.map((item) => {
      return {
        cartId: cart.id,
        sizeId: item.sizeId,
        quantity: item.quantity,
        batchId: batchId,
      };
    });
    const cartItem = await this.databaseService.orderItem.createMany({
      data: processed,
    });

    const cartItems = await this.databaseService.orderItem.findMany({
      where: {
        batchId,
      },
      include: {
        size: {
          include: { product: true },
        },
      },
    });

    cartItems.map(async (item) => {
      const size = await this.databaseService.size.findUnique({
        where: {
          id: item.sizeId,
        },
        include: {
          product: true,
        },
      });
      await this.databaseService.orderDetail.create({
        data: {
          orderItemId: item.id,
          size: size.name,
          quantity: item.quantity,
          price: size.product.discountPrice || size.product.price,
          productName: size.product.name,
          imageUrl: size.product.imageUrl[0],
        },
      });
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
          paymentStatus: PaymentStatus.PENDING,
          orderStatus: OrderStatus.CHECKED_OUT,
          deliveryStatus: DeliveryStatus.PENDING,
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

  async batchUpdate(batchId: string, updateCartItemDto: UpdateCartItemDto) {
    const updatedCartItem = await this.databaseService.orderItem.updateMany({
      where: {
        batchId,
      },
      data: updateCartItemDto,
    });
    return {
      message: 'Cart items updated',
      orderItem: updatedCartItem,
    };
  }

  async getBatchAll() {
    try {
      const orderItems = await this.databaseService.orderItem.findMany({
        include: {
          orderDetail: true,
        },
      });
      const batches = orderItems.reduce((acc, item) => {
        if (!acc[item.batchId]) {
          acc[item.batchId] = [];
        }
        acc[item.batchId].push(item);
        return acc;
      }, {});

      return Object.values(batches);
    } catch (error) {
      console.error('Error in getBatchAll:', error);
      throw new Error('Failed to retrieve batch items.');
    }
  }

  async getBatch(batchId: string) {
    try {
      const orderItems = await this.databaseService.orderItem.findMany({
        where: {
          batchId,
        },
        include: {
          orderDetail: true,
        },
      });

      return orderItems;
    } catch (error) {
      console.error('Error in getBatch:', error);
      throw new Error('Failed to retrieve batch items.');
    }
  }

  async fixOrderDetail() {
    //get all order details
    await this.databaseService.transactionHistory.deleteMany({});
    await this.databaseService.orderItem.deleteMany({});
    return {
      message: 'Order items deleted',
    };
  }
}
