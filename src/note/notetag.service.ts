import { Injectable, Logger } from '@nestjs/common';
import { Notetag } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotetagDto } from './dto/notetag.dto';

@Injectable()
export class NotetagService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Notetag)
    private readonly notetagRepository: Repository<Notetag>,
  ) {
    this.logger = new Logger(NotetagService.name);
  }

  async create(notetagDto: NotetagDto) {
    return this.notetagRepository.save(notetagDto);
  }

  async remove(notetagDto: NotetagDto) {
    const remove = await this.notetagRepository.delete({
      note_id: notetagDto.note_id,
      tag_id: notetagDto.tag_id,
    });
    return { removed: remove.affected ? true : false };
  }
}
