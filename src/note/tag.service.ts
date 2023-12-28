import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Notetag, Tag } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>,
    @InjectRepository(Notetag)
    private readonly notetagRepository: Repository<Notetag>,
  ) {
    this.logger = new Logger(TagService.name);
  }
  async create(tagData: CreateTagDto) {
    return this.TagRepository.save(tagData);
  }

  async findAll() {
    return this.TagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.TagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new HttpException(`Tag not found`, HttpStatus.NOT_FOUND);
    }
    return tag;
  }

  async update(id: number, tagData: UpdateTagDto) {
    await this.findOne(id);
    const update = await this.TagRepository.update({ id }, tagData);
    if (!update.affected) {
      throw new HttpException(`Tag not updated`, HttpStatus.FORBIDDEN);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    const relation = await this.notetagRepository.find({
      where: { tag_id: id },
    });
    if (relation.length) {
      throw new HttpException(
        `Tag is hooked to some notes`,
        HttpStatus.CONFLICT,
      );
    }
    const remove = await this.TagRepository.delete(id);
    if (!remove.affected) {
      throw new HttpException(`Note not removed`, HttpStatus.FORBIDDEN);
    }
    return { removed: true };
  }
}
