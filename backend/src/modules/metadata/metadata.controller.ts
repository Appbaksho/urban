import { Controller, Get, Body, Put } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/')
  async findOne() {
    return this.metadataService.findOne();
  }

  @Put('top-banner')
  updateTopBanner(@Body() updateMetadatumDto: UpdateMetadatumDto) {
    return this.metadataService.updateTopBanner(updateMetadatumDto);
  }

  @Put('delivery-charges')
  update(@Body() updateMetadatumDto: UpdateMetadatumDto) {
    return this.metadataService.updateDeliveryCharge(updateMetadatumDto);
  }
}
