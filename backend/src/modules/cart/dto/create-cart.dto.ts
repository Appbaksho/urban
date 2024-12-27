import { PaymentMethod } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateCartDto {}
export class AddToCartDto {
  productVariantId: string;
  quantity: number;
}

export class CheckoutDto {
  @IsEnum(PaymentMethod)
  paymentMethod: string;
}
