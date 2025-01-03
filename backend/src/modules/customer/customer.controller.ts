import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AccessTokenGuard } from 'src/middlewares/access-token.guard';
import { User } from 'src/decorators/user.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @User() firebaseUser,
  ) {
    console.log(firebaseUser);
    return this.customerService.create(firebaseUser, createCustomerDto);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
