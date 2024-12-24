import { Injectable } from '@nestjs/common';
import { CreateProfilCondidatDto } from './dto/create-profil-condidat.dto';
import { UpdateProfilCondidatDto } from './dto/update-profil-condidat.dto';

@Injectable()
export class ProfilCondidatService {
  create(createProfilCondidatDto: CreateProfilCondidatDto) {
    return 'This action adds a new profilCondidat';
  }

  findAll() {
    return `This action returns all profilCondidat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profilCondidat`;
  }

  update(id: number, updateProfilCondidatDto: UpdateProfilCondidatDto) {
    return `This action updates a #${id} profilCondidat`;
  }

  remove(id: number) {
    return `This action removes a #${id} profilCondidat`;
  }
}
