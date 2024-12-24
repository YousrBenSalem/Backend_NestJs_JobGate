/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
@Schema()
export class Experience extends Document {
  @Prop()
  NomDeEntreprise: string ;
  @Prop()
  poste: string ;
  @Prop()
  dateDeDebut : string ;
  @Prop()
  dateDeFin : string ;
  @Prop()
  description : string ;

  
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
