import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetanceService } from './competance.service';
import { CreateCompetanceDto } from './dto/create-competance.dto';
import { UpdateCompetanceDto } from './dto/update-competance.dto';

@Controller('competance')
export class CompetanceController {
  constructor(private readonly competanceService: CompetanceService) {}

  @Post()
  create(@Body() createCompetanceDto: CreateCompetanceDto) {
    return this.competanceService.create(createCompetanceDto);
  }

  @Get()
  findAll() {
    return this.competanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetanceDto: UpdateCompetanceDto) {
    return this.competanceService.update(+id, updateCompetanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competanceService.remove(+id);
  }
}
