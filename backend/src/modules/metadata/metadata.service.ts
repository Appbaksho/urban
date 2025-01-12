import { Injectable } from '@nestjs/common';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MetadataService {
  constructor(private readonly databaseService: DatabaseService) {}
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

  async update(id: number, updateMetadatumDto: UpdateMetadatumDto) {
    return `This action updates a #${id} metadatum`;
  }
}
