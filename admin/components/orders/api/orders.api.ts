export interface Order {
  id: string
  customerId: string
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
