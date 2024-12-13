import { Gender } from '@prisma/client';

export class CreateProductVariantDto {
  additionalName: string;
  size: string;
  color: string;
  gender?: Gender; // Assuming Gender is an enum, you might want to import and use it here
  stock: number;
  imageUrl: string[];
  price: number;
}

export class CreateProductDto {
  name: string;
  description: string;
  categoryId: string;
  variants: CreateProductVariantDto[];
}
