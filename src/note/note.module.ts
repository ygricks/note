import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, Tag, Notetag } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag, Notetag])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
