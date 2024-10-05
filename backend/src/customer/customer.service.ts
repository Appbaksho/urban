import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DatabaseService } from '../modules/database/database.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService:DatabaseService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.databaseService.customer.create({
       data: {
          firebaseId: randomStringGenerator(),
          name: createCustomerDto.name,
       }
    });
    return {
      message: "Customer created successfully",
      customer: customer
    };
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
