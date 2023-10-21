import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Note } from './entities/note.entity';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: EntityRepository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto) {
    return 'This action adds a new note';
  }

  async findAll() {
    const data = await this.noteRepository.find({}, {});
    // return `This action returns all note ${data.length}`;
    return data;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.find({ id }, {});
    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
