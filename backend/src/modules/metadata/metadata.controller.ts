import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/')
  async findOne() {
    return this.metadataService.findOne();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMetadatumDto: UpdateMetadatumDto,
  ) {
    return this.metadataService.update(+id, updateMetadatumDto);
  }
}
