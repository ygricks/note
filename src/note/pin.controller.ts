import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PinService } from './pin.service';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';

@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post()
  create(@Body() createPinDto: CreatePinDto) {
    return this.pinService.create(createPinDto);
  }

  @Get()
  findAll() {
    return this.pinService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.pinService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePinDto: UpdatePinDto) {
    return this.pinService.update(id, updatePinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pinService.remove(id);
  }
}
