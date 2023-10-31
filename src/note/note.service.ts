import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Note } from './entities';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class NoteService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: EntityRepository<Note>,
  ) {
    this.logger = new Logger(NoteService.name);
  }
  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = new Note(createNoteDto.short, createNoteDto.message);
      const insert = await this.noteRepository.create(note);
      await this.noteRepository.flush();
      return insert;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findAll() {
    const data = await this.noteRepository.find({}, { limit: 10 });
    return data;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({ id }, {});
    if (!note) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    const result = await wrap(note).assign(updateNoteDto, {
      updateByPrimaryKey: true,
    });
    await this.noteRepository.flush();
    return result;
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    const remove = this.noteRepository.removeAndFlush(note);
    return remove;
  }
}
