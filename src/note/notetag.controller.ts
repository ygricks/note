import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotetagDto } from './dto/notetag.dto';
import { NotetagService } from './notetag.service';

@Controller('notetag')
export class NoteTagController {
  constructor(private readonly notetagService: NotetagService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() notetag: NotetagDto) {
    return this.notetagService.create(notetag);
  }

  @Delete(':note_id/:tag_id')
  remove(@Param() notetagDto: NotetagDto) {
    return this.notetagService.delete({
      note_id: notetagDto.note_id,
      tag_id: notetagDto.tag_id,
    });
  }
}
