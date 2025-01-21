export interface MetaData {
    id: string
    deliveryCharge: number
    deliveryChargeOutsideDhaka: number
    bannerUrl: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    parentCategory: ParentCategory[]
  }
  
  export interface ParentCategory {
    name: string
    description: string
    imageUrl: string
    metadataId: string
    categories: Category[]
  }
  
  export interface Category {
    id: string
    name: string
    description: string
    imageUrl: string
    parentCategoryId: string
  }
  