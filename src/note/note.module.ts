import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Note, Pin, Notepin } from './entities';
// import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Note, Pin, Notepin])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
