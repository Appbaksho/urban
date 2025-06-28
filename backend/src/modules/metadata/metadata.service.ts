import { Injectable, Logger } from '@nestjs/common';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MetadataService {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService.metadata.findFirst().then((data) =>{
    if (!data) {
      this.databaseService.metadata.create({
        data: {
          bannerUrl: '',
          bannerImage: '',
          title: 'Urban Shop',
          description: 'Your lifestyle partner',
          deliveryCharge: 60,
          deliveryChargeOutsideDhaka: 120,
        },
      }).then(() => {
        Logger.log('Metadata created');
      }).catch((error) => {
        Logger.error(error);
      }); 
    }
    });
  }
  async findOne() {
    return this.databaseService.metadata.findFirst({
      include: {
        parentCategory: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async updateTopBanner(updateMetadatumDto: UpdateMetadatumDto) {
    return this.databaseService.metadata.update({
      where: { id: "cm6z9jb130000bthwz6d29zbf" },
      data: {
        bannerUrl: updateMetadatumDto.bannerUrl,
        bannerImage: updateMetadatumDto.bannerImage,
        title: updateMetadatumDto.title,
        description: updateMetadatumDto.description,
      },
    });
  }

  async updateDeliveryCharge(updateMetadatumDto: UpdateMetadatumDto) {
    return this.databaseService.metadata.update({
      where: { id: "cm6z9jb130000bthwz6d29zbf" },
      data: {
        deliveryCharge:Number(updateMetadatumDto.deliveryCharge.inside),
        deliveryChargeOutsideDhaka:Number(updateMetadatumDto.deliveryCharge.outside)
      },
    });
  }
}
