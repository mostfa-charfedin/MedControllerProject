import { User } from "./user";

export class Doc {
  public id!:any;
  public nomOrdenance!: String;
  public ordenance!: String;
  public nomBulletin!: String;
  public bulletin!: String;
  public medecinId!: any;
  public agentId!: any;
  public user:User | undefined;
  public etat!:String;
}
