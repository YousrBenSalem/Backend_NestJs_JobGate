import { Injectable } from '@nestjs/common';
import { CreateCompetanceDto } from './dto/create-competance.dto';
import { UpdateCompetanceDto } from './dto/update-competance.dto';

@Injectable()
export class CompetanceService {
  create(createCompetanceDto: CreateCompetanceDto) {
    return 'This action adds a new competance';
  }

  findAll() {
    return `This action returns all competance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competance`;
  }

  update(id: number, updateCompetanceDto: UpdateCompetanceDto) {
    return `This action updates a #${id} competance`;
  }

  remove(id: number) {
    return `This action removes a #${id} competance`;
  }
}
