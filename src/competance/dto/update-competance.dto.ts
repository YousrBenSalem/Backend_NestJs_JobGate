import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetanceDto } from './create-competance.dto';

export class UpdateCompetanceDto extends PartialType(CreateCompetanceDto) {}
