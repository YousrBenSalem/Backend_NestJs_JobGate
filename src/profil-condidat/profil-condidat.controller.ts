import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilCondidatService } from './profil-condidat.service';
import { CreateProfilCondidatDto } from './dto/create-profil-condidat.dto';
import { UpdateProfilCondidatDto } from './dto/update-profil-condidat.dto';

@Controller('profil-condidat')
export class ProfilCondidatController {
  constructor(private readonly profilCondidatService: ProfilCondidatService) {}

  @Post()
  create(@Body() createProfilCondidatDto: CreateProfilCondidatDto) {
    return this.profilCondidatService.create(createProfilCondidatDto);
  }

  @Get()
  findAll() {
    return this.profilCondidatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilCondidatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfilCondidatDto: UpdateProfilCondidatDto) {
    return this.profilCondidatService.update(+id, updateProfilCondidatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilCondidatService.remove(+id);
  }
}
