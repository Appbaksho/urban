import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DatabaseService } from '../database/database.service';
import { Location } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(firebaseUser: any, createCustomerDto: CreateCustomerDto) {
    let location: Location;
    if (createCustomerDto.shippingLocation) {
      location = await this.databaseService.location.create({
        data: {
          latitude: createCustomerDto.shippingLocation.latitude,
          longitude: createCustomerDto.shippingLocation.longitude,
        },
      });
    }
    const customer = await this.databaseService.customer.create({
      data: {
        firebaseId: firebaseUser.uid,
        name: createCustomerDto.name,
        email: firebaseUser.email,
        photoUrl: createCustomerDto.photoUrl,
        homeAddress: createCustomerDto.homeAddress,
        permanentAddress: createCustomerDto.permanentAddress,
        shippingAddress: createCustomerDto.shippingAddress,
        dateOfBirth: createCustomerDto.dateOfBirth,
        contactNumbers: createCustomerDto.contactNumbers,
        gender: createCustomerDto.gender,
        locationId: location ? location.id : null,
      },
    });
    return {
      message: 'Customer created successfully',
      customer: customer,
    };
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findOne(id: string) {
    return this.databaseService.customer.findUnique({
      where: { firebaseId: id },
    });
  }

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} customer`;
  // }
}
