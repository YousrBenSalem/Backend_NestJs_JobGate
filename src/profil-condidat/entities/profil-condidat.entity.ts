/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class ProfilCondidat extends Document {
  @Prop()
  condidat : string;
  @Prop()
  competences : string ;
  @Prop()
  experiences : string
}
export const ProfilCondidatSchema = SchemaFactory.createForClass(ProfilCondidat)
