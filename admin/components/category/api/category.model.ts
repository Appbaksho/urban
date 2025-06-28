export interface CreateCategory {
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: string;
}
  
export interface Category {
    id:string
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: string;
    children?: Category[];
    childrenCategories?: Category[];
    refetch?: () => void;
}
  

export interface parentCategory {
        name: string
        description: string
        imageUrl: string
        metadataId: string
}