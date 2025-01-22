
  export interface Size {
    id: string
    name: string
    stock: number
    productId: string
    product: Product
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    categoryId: string
    imageUrl: string[]
    details: string[]
    sizeDescription: string[]
    price: number
    discountPrice: any
    createdAt: string
    updatedAt: string
    continued: boolean
  }
  
  
  
  export interface BatchOrder {
    id: string
    sizeId: string
    quantity: number
    cartId: string
    isCheckedOut: boolean
    deliveryStatus: string
    paymentStatus: string
    orderStatus: string
    batchId: string
    createdAt: string
    orderDetail: OrderDetail
  }
  
  export interface OrderDetail {
    id: string
    quantity: number
    size: string
    price: number
    productName: string
    imageUrl: string
    orderItemId: string
  }
  


  export interface Order {
    id: string
    sizeId: string
    quantity: number
    cartId: string
    isCheckedOut: boolean
    deliveryStatus: string
    paymentStatus: string
    orderStatus: string
    batchId: string
    createdAt: string
    orderDetail: OrderDetail
    cart: Cart
    size: Size2
  }
  
  export interface OrderDetail {
    id: string
    quantity: number
    size: string
    price: number
    productName: string
    imageUrl: string
    orderItemId: string
  }
  
  export interface Cart {
    id: string
    customerId: string
    deliveryCharge: number
    customer: Customer
    items: Item[]
  }
  
  export interface Customer {
    firebaseId: string
    name: string
    email: string
    photoUrl: string
    shippingAddress: string
    city: string
    zipCode: string
    contactNumbers: string[]
    createdAt: string
    updatedAt: string
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
    batchId: string
    createdAt: string
    orderDetail: OrderDetail2
    size: Size
  }
  
  export interface OrderDetail2 {
    id: string
    quantity: number
    size: string
    price: number
    productName: string
    imageUrl: string
    orderItemId: string
  }
  
  export interface Size {
    id: string
    name: string
    stock: number
    productId: string
    product: Product
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    categoryId: string
    imageUrl: string[]
    details: string[]
    sizeDescription: string[]
    price: number
    discountPrice: any
    createdAt: string
    updatedAt: string
    continued: boolean
  }
  
  export interface Size2 {
    id: string
    name: string
    stock: number
    productId: string
    product: Product2
  }
  
  export interface Product2 {
    id: string
    name: string
    description: string
    categoryId: string
    imageUrl: string[]
    details: string[]
    sizeDescription: string[]
    price: number
    discountPrice: number
    createdAt: string
    updatedAt: string
    continued: boolean
  }
  