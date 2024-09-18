import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports:[
    PrismaModule
  ],
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  exports: [PrismaService],
})
export class ItemModule {}
