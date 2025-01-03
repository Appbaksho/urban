import { PaymentMethod } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateCartDto {}
export class AddToCartDto {
  productId: string;
  sizeId: string;
  quantity: number;
}

export class CheckoutDto {
  @IsEnum(PaymentMethod)
  paymentMethod: string;
}
