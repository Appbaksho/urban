export interface CreateCategory {
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: string;
}
  
export interface Category {
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: string;
    children?: Category[];
    childrenCategories?: Category[];
}
  