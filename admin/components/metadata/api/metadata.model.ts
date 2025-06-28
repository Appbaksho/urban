export interface MetaData {
    id: string
    deliveryCharge: number
    deliveryChargeOutsideDhaka: number
    bannerImage: string
    bannerUrl: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    parentCategory: ParentCategory[]
    refetch?: () => void
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
  

  export interface DeliveryChargeUpdatePayload{
    deliveryCharge: {
      inside: number
      outside: number
    }
  }

  export interface BannerUpdatePayload{
    bannerImage: string[]
    bannerUrl: string
    title: string
    description: string
  }