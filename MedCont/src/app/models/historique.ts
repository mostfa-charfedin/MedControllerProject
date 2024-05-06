import { Doc } from "./doc";
import { User } from "./user";

export class Historique {
  public id!:any;
  public action!: String;
  public time!: Date;
  public document!:Doc;
  public medecin!:User;
  public agent!:User;
  public admin!:User;
}
