import { Module } from '@nestjs/common';
import { Note, Pin, Notepin } from './entities';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Pin, Notepin])],
  controllers: [PinController],
  providers: [PinService],
})
export class PinModule {}
