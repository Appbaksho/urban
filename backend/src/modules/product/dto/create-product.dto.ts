import { IsOptional } from 'class-validator';

export class Size {
  @IsOptional()
  id: string;
  name: string;
  stock: number;
}

export class CreateProductDto {
  name: string;
  description: string;
  categoryId?: string;
  imageUrl: string[];
  sizes: Size[];
  details: string[];
  sizeDescription: string[];
  price: number;
}
