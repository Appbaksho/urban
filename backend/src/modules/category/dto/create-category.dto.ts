export class CreateCategoryDto {
  name: string;
  description: string;
  imageUrl: string;
  parentCategoryId?: string;
}
