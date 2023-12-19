import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { Notepin, Pin } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PinService {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Pin)
    private readonly pinRepository: Repository<Pin>,
    @InjectRepository(Notepin)
    private readonly notepinRepository: Repository<Notepin>,
  ) {
    this.logger = new Logger(PinService.name);
  }
  async create(pinDto: CreatePinDto) {
    return this.pinRepository.save(pinDto);
  }

  async findAll() {
    return this.pinRepository.find();
  }

  async findOne(id: number) {
    const pin = await this.pinRepository.findOne({ where: { id } });
    if (!pin) {
      throw new HttpException(`Pin not found`, HttpStatus.NOT_FOUND);
    }
    return pin;
  }

  async update(id: number, updatePinDto: UpdatePinDto) {
    await this.findOne(id);
    return this.pinRepository.update({ id }, updatePinDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    const relation = await this.notepinRepository.find({
      where: { pin_id: id },
    });
    if (relation.length) {
      throw new HttpException(
        `Pin is hooked to some notes`,
        HttpStatus.CONFLICT,
      );
    }
    const remove = await this.pinRepository.delete(id);
    return { removed: remove.affected ? true : false };
  }
}
