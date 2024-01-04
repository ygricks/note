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
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { BetweenDate } from './types';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.noteService.findOne(id);
  }

  @Get('between/:from/:to')
  async findBetween(@Param('from') _from: Date, @Param('to') _to: Date) {
    const between: BetweenDate = {
      from: new Date(_from),
      to: new Date(_to),
    };
    return this.noteService.findBetween(between);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.noteService.delete(id);
  }
}
