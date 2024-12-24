import { PartialType } from '@nestjs/mapped-types';
import { CreateCondidatDto } from './create-condidat.dto';

export class UpdateCondidatDto extends PartialType(CreateCondidatDto) {}
