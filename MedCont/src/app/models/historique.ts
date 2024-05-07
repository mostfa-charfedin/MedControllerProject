import { Doc } from "./doc";
import { User } from "./user";

export class Historique {
  public id!:any;
  public action: String | undefined;
  public time!: Date;
  public document:Doc | undefined;
  public medecin:User | undefined;
  public agent:User | undefined;
  public admin:User | undefined;
}
