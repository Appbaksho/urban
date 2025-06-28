export class CreateMetadatumDto {
  deliveryCharge?: {
    inside: number;
    outside: number;
  }
  bannerUrl?: string;
  bannerImage?: string;
  title?: string;
  description?: string;
}
