import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, Pin, Notepin } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Pin, Notepin])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
