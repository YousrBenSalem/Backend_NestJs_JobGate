import { PartialType } from '@nestjs/mapped-types';
import { CreateProfilCondidatDto } from './create-profil-condidat.dto';

export class UpdateProfilCondidatDto extends PartialType(CreateProfilCondidatDto) {}
