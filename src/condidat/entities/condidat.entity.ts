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
export class Competance  {
  @Prop()
  nom: string;

  @Prop()
  niveauRequis : string;
}
export const CompetanceSchema = SchemaFactory.createForClass(Competance)

@Schema()
export class Languages  {
  @Prop()
  langue: string;

  @Prop()
  niveauRequis : string;
}
export const LangueSchema = SchemaFactory.createForClass(Languages)
@Schema()
export class Sociaux  {
  @Prop()
  reseauSocial: string;

  @Prop()
  link : string;
}
export const sociauxSchema = SchemaFactory.createForClass(Sociaux)

@Schema()
export class Experience  {
  
  @Prop()
  poste: string ;
  @Prop()
  dateDeDebut : string ;
  @Prop()
  dateDeFin : string ;
  @Prop()
  taches : string ;
  @Prop()
  company:string ;


  
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
@Schema()
export class Condidat extends User {
  @Prop()
  image : string ;
  @Prop()
  prenom: string ;


  @Prop()
  job:string ;
  @Prop()
  description :string;
  @Prop()
  currentWorkplace:string;
  @Prop({type:[CompetanceSchema], default:[]})
  skills:Competance[]
  @Prop({type:[CompetanceSchema], default:[]})
  personalSkills:Competance[]
  @Prop({type:[LangueSchema], default:[]})
  languages:Languages[]
  @Prop({type:[sociauxSchema], default:[]})
  sociaux:Sociaux[]
    @Prop({type:[ExperienceSchema], default:[]})
  experience : Experience[];






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
  @Prop({default:"Pending"})
  postulationStatus:string;
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  entrepriseId : Types.ObjectId[];


  

  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"profilCondidat"})
  profilCondiatId : Types.ObjectId;
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"offre"}]})
  offreId : Types.ObjectId[];

  item : string ;
}
export const CondidatSchema = SchemaFactory.createForClass(Condidat);
