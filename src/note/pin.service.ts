import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Pin } from './entities';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class PinService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Pin)
    private readonly pinRepository: EntityRepository<Pin>,
  ) {
    this.logger = new Logger(PinService.name);
  }
  async create(pinDto: CreatePinDto) {
    console.log('===========>');
    this.logger.log(JSON.stringify(pinDto));
    const pin = new Pin(pinDto.short, pinDto.message, pinDto.color);
    console.log('===========>', { pin });
    const insert = await this.pinRepository.create(pin);
    await this.pinRepository.flush();
    return insert;
  }

  async findAll() {
    const data = await this.pinRepository.find({}, { limit: 10 });
    return data;
  }

  async findOne(id: number) {
    const pin = await this.pinRepository.findOne({ id }, {});
    if (!pin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return pin;
  }

  async update(id: number, updatePinDto: UpdatePinDto) {
    const pin = await this.findOne(id);
    const result = await wrap(pin).assign(updatePinDto, {
      updateByPrimaryKey: true,
    });
    await this.pinRepository.flush();
    return result;
  }

  async remove(id: number) {
    const pin = await this.findOne(id);
    const remove = this.pinRepository.removeAndFlush(pin);
    return remove;
  }
}
