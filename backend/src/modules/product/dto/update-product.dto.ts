import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Size } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    id: string
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
