import { Module } from '@nestjs/common';
import { Note, Tag, Notetag } from './entities';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag, Notetag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
