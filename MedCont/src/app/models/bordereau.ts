import { Facture } from "./facture";
import { User } from "./user";

export class Bordereau {
  public id!:any;
  public bordereau!: String;
  public user:User | undefined;
  public facture!:Facture ;
  public paye!: boolean;
  public dateTraitement!: Date;
  public dateFacturation!: Date;
}
