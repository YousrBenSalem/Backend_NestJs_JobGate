import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondidatService } from './condidat.service';
import { CreateCondidatDto } from './dto/create-condidat.dto';
import { UpdateCondidatDto } from './dto/update-condidat.dto';

@Controller('condidat')
export class CondidatController {
  constructor(private readonly condidatService: CondidatService) {}

  @Post()
  create(@Body() createCondidatDto: CreateCondidatDto) {
    return this.condidatService.create(createCondidatDto);
  }

  @Get()
  findAll() {
    return this.condidatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condidatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondidatDto: UpdateCondidatDto) {
    return this.condidatService.update(+id, updateCondidatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condidatService.remove(+id);
  }
}
