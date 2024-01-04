import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Between } from '../../dist/note/types/between';

@Injectable()
export class NoteService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {
    this.logger = new Logger(NoteService.name);
  }
  async create(createNoteDto: CreateNoteDto) {
    return this.noteRepository.save(createNoteDto);
  }

  async findAll() {
    return this.noteRepository.find();
  }

  async findBetween(between: Between) {
    const noteData = await this.noteRepository.manager.query(
      'SELECT tn.* FROM note AS tn WHERE tn.created_at >= $1::timestamp AND tn.created_at <= $2::timestamp ORDER BY tn.id ',
      [between.from, between.to],
    );
    return noteData;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new HttpException(`Note not found`, HttpStatus.NOT_FOUND);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);
    const update = await this.noteRepository.update({ id }, updateNoteDto);
    if (!update.affected) {
      throw new HttpException(`Note not updated`, HttpStatus.FORBIDDEN);
    }
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.findOne(id);
    const remove = await this.noteRepository.delete({ id });
    if (!remove.affected) {
      throw new HttpException(`Note not deleted`, HttpStatus.FORBIDDEN);
    }
    return { deleted: true };
  }
}
