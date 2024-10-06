import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class Location {
  latitude: number;
  longitude: number;
}

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsOptional()
  @ToDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  homeAddress?: string;

  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @Type(() => Location)
  shippingLocation?: Location;

  @IsArray()
  @IsString({ each: true })
  contactNumbers: string[];

  @IsEnum(Gender)
  gender: Gender;
}

export function ToDate() {
  return Transform(({ value }) => new Date(value));
}
