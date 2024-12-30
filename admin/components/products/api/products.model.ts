export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface Size {
    id: string;
    name: string;
    stock: number;
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