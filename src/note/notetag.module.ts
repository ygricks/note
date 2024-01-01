import { Module } from '@nestjs/common';
import { Note, Tag, Notetag } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteTagController } from './notetag.controller';
import { NotetagService } from './notetag.service';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag, Notetag])],
  controllers: [NoteTagController],
  providers: [NotetagService, NotetagService, TagService],
})
export class NotetagModule {}
