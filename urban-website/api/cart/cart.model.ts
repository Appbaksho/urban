import { UserPayload } from "../auth/auth.model"
import { Product } from "../products/products.model"

export interface Cart {
    id: string
    customerId: string
    deliveryCharge: number
    items: Item[]
}
export interface OrderCart {
    id: string
    customer:UserPayload
    deliveryCharge: number
    items: Item[]
}
  
  export interface Item {
    id: string
    sizeId: string
    quantity: number
    cartId: string
    isCheckedOut: boolean
    deliveryStatus: string
    paymentStatus: string
    orderStatus: string
    size: Size
    refetch?: () => void
  }
  
  export interface Size {
    id: string
    name: string
    stock: number
    productId: string
    product: Product
  }
  
  
  
  export interface SingleOrder {
    id: string
    sizeId: string
    quantity: number
    cartId: string
    isCheckedOut: boolean
    deliveryStatus: string
    paymentStatus: string
    orderStatus: string
    cart: OrderCart
    size: Size
  }
  

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