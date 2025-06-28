import { IsString, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class Location {
  latitude: number;
  longitude: number;
}

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsArray()
  @IsString({ each: true })
  contactNumbers: string[];

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

export function ToDate() {
  return Transform(({ value }) => new Date(value));
}
