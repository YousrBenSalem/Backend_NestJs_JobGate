import { Injectable } from '@nestjs/common';
import { CreateCondidatDto } from './dto/create-condidat.dto';
import { UpdateCondidatDto } from './dto/update-condidat.dto';

@Injectable()
export class CondidatService {
  create(createCondidatDto: CreateCondidatDto) {
    return 'This action adds a new condidat';
  }

  findAll() {
    return `This action returns all condidat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condidat`;
  }

  update(id: number, updateCondidatDto: UpdateCondidatDto) {
    return `This action updates a #${id} condidat`;
  }

  remove(id: number) {
    return `This action removes a #${id} condidat`;
  }
}
