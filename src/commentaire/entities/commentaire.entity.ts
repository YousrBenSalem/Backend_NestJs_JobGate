/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
@Schema()
export class Commentaire  extends Document{
  @Prop()
  auteur : string ;

  @Prop()
  contenu : string ;

  @Prop()
  date : string ;
}

export const CommentaireSchema = SchemaFactory.createForClass(Commentaire)
