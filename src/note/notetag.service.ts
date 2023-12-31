import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Note, Notetag, Tag } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotetagDto } from './dto/notetag.dto';

@Injectable()
export class NotetagService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Notetag)
    private readonly notetagRepository: Repository<Notetag>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    this.logger = new Logger(NotetagService.name);
  }

  async create(notetagDto: NotetagDto) {
    const note = await this.noteRepository.findOne({
      where: { id: notetagDto.note_id },
    });
    const tag = await this.tagRepository.findOne({
      where: { id: notetagDto.tag_id },
    });
    if (!note || !tag) {
      const entity = !note && !tag ? 'Note & Tag' : !note ? 'Note' : 'Tag';
      throw new HttpException(`${entity} not found`, HttpStatus.NOT_FOUND);
    }
    return this.notetagRepository.save({
      note_id: note.id,
      tag_id: tag.id,
    });
  }

  async delete(notetagDto: NotetagDto) {
    const remove = await this.notetagRepository.delete({
      note_id: notetagDto.note_id,
      tag_id: notetagDto.tag_id,
    });
    if (!remove.affected) {
      throw new HttpException(`Notetag not deleted`, HttpStatus.FORBIDDEN);
    }
    return { deleted: true };
  }
}
