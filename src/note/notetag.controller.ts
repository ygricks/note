import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotetagDto } from './dto/notetag.dto';
import { NotetagService } from './notetag.service';

@Controller('note')
export class NoteTagController {
  constructor(private readonly notetagService: NotetagService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() NotetagDto: NotetagDto) {
    return this.notetagService.create(NotetagDto);
  }

  // @Delete(':note_id/:tag_id')
  // remove_old(
  //   @Param('note_id') note_id: number,
  //   @Param('tag_id') tag_id: number,
  // ) {
  //   return this.notetagService.remove({
  //     note_id,
  //     tag_id,
  //   });
  // }

  @Delete(':note_id/:tag_id')
  remove(@Param() notetagDto: NotetagDto) {
    return this.notetagService.remove({
      note_id: notetagDto.note_id,
      tag_id: notetagDto.tag_id,
    });
  }
}
