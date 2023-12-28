import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() tag: CreateTagDto) {
    return this.tagService.create(tag);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() tagDada: UpdateTagDto) {
    return this.tagService.update(id, tagDada);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
