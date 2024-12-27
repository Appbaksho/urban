import { Injectable } from "@nestjs/common";
import { UpdateCartItemDto } from "./dto/update-cart.dto";
import { DatabaseService } from "../database/database.service";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { AddToCartDto } from "./dto/create-cart.dto";

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
            productVariant: {
              include: {
                product: {
                  include: {
                    discounts: {
                      select: {
                        discount: {
                          select: {
                            percentage: true,
                          },
                        },
                      },
                      orderBy: {
                        discount: {
                          createdAt: "desc",
                        },
                      },
                      take: 1,
                    },
                  },
                },
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
            productVariant: {
              include: {
                product: {
                  include: {
                    discounts: {
                      select: {
                        discount: {
                          select: {
                            percentage: true,
                          },
                        },
                      },
                      orderBy: {
                        discount: {
                          createdAt: "desc",
                        },
                      },
                      take: 1,
                    },
                  },
                },
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
        productVariantId: addToCartDto.productVariantId,
        cartId: cart.id,
        quantity: addToCartDto.quantity,
      },
    });

    return {
      message: "Product added to cart",
      orderItem: cartItem,
    };
  }

  update(orderItemId: string, updateCartItemDto: UpdateCartItemDto) {
    const updatedCartItem = this.databaseService.orderItem.update({
      where: {
        id: orderItemId,
      },
      data: updateCartItemDto,
    });
    return {
      message: "Cart item updated",
      orderItem: updatedCartItem,
    };
  }

  async checkout(customerId: string, checkoutDto: any) {
    const cart = await this.createIfNotFound(customerId);
    cart.items.map(async (item) => {
      const discountPercentage =
        item.productVariant.product.discounts.length > 0
          ? item.productVariant.product.discounts[0].discount.percentage
          : 0;

      await this.databaseService.transactionHistory.create({
        data: {
          orderItemId: item.id,
          paymentMethod: checkoutDto.paymentMethod,
          amount:
            item.quantity * item.productVariant.price -
            item.productVariant.price * discountPercentage,
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
      message: "Cart checked out",
    };
  }

  async remove(cartItemId: string) {
    await this.databaseService.orderItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return {
      message: "Cart item removed",
    };
  }
}
