import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(firebaseUser: any, createCustomerDto: CreateCustomerDto) {
    const customer = await this.databaseService.customer.create({
      data: {
        firebaseId: firebaseUser.uid,
        name: createCustomerDto.name,
        email: firebaseUser.email,
        photoUrl: createCustomerDto.photoUrl,
        shippingAddress: createCustomerDto.shippingAddress,
        contactNumbers: createCustomerDto.contactNumbers,
        zipCode: createCustomerDto.zipCode,
        city: createCustomerDto.city,
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
