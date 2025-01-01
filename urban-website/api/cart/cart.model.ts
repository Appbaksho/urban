export interface AddToCartPayload {
    productId: string;
    sizeId: string;
    quantity: number;
}
export interface UpdateCartDto {
    isCheckedOut: boolean;
    deliveryStatus: DeliveryStatus;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
}



export enum DeliveryStatus {
    PENDING,
    DISPATCHED,
    DELIVERED,
    CANCELLED
}
  
export enum OrderStatus {
    PENDING,
    CHECKED_OUT,
    CANCELLED
}
  
export  enum PaymentStatus {
    PENDING,
    PAID,
    REFUNDED,
    CANCELLED
}
  
export  enum PaymentMethod {
    CASH_ON_DELIVERY,
    CREDIT_CARD,
    DEBIT_CARD,
    MOBILE_BANKING,
    OTHER
}