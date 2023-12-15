import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Note, Pin, Notepin } from './entities';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';
// import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Note, Pin, Notepin])],
  controllers: [PinController],
  providers: [PinService],
})
export class PinModule {}
