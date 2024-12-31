export interface Product {
  id?: string
  name: string
  description: string
  categoryId: string
  imageUrl: string[]
  details: string[]
  sizeDescription: string[]
  price: number
  discountPrice: any
  createdAt?: string
  updatedAt?: string
  continued?: boolean
  sizes: Size[]
}

export interface ImageResponse{
        message: string
        imageUrl: string      
}

export interface Size {
  id: string
  name: string
  stock: number
  productId: string
}
  

export interface ProductPayload  {
        name: string;
        description: string;
        categoryId?: string;
        imageUrl: string[];
        sizes: Size[];
        details: string[];
        sizeDescription: string[];
        price: number;
      
}