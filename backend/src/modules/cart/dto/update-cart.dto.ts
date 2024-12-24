import { PartialType } from "@nestjs/mapped-types";
import { DeliveryStatus, OrderStatus, PaymentStatus } from "@prisma/client";

class UpdateCartDto {
  isCheckedOut: boolean;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

export class UpdateCartItemDto extends PartialType(UpdateCartDto) {}
