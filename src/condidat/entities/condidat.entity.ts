/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
@Schema()
export class Formation {

@Prop()
diplome: string;
@Prop()
ecole : string ;
@Prop()
dateDeDebut: string ;
@Prop()
dateDeFin: string ;
}

export const FormationSchema = SchemaFactory.createForClass(Formation)
@Schema()
export class Condidat extends User {
  @Prop()
  image : string ;
  @Prop()
  prenom: string ;
  @Prop()
  adresse : string ;
  @Prop()
  telephone : number ;
  @Prop()
  cin : number ;
  @Prop({type:[FormationSchema], default:[]})
  formation : Formation[];
/*   @Prop()
  offresFavoris : string[]; */
  @Prop()
  cv: string ;
  @Prop()
  dateNaissance: string ;
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  entrepriseId : Types.ObjectId[];

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"commentaire"}]})
  commentaireId : Types.ObjectId[];
  
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"competance"}]})
  competanceId : Types.ObjectId[];
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"profilCondidat"})
  profilCondiatId : Types.ObjectId;
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"offre"}]})
  offreId : Types.ObjectId[];

  item : string ;
}
export const CondidatSchema = SchemaFactory.createForClass(Condidat);
