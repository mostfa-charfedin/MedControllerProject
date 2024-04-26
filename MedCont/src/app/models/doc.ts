import { User } from "./user";

export class Doc {
  public id!:any;
  public nomOrdenance!: String;
  public ordenance!: String;
  public nomBulletin!: String;
  public bulletin!: String;
  public medecinId!: any;
  public agentId!: any;
  public dateAffectation!: Date;
  public dateTrete!: Date;

  public bordereau!: String;

  public qualiteBinificiaire!: string;
  public nomBenificiaire!: string;
  public nomAssure!: string;
  public matriculeAssure!: string;
  public montant!: number;

  public user:User | undefined;
  public etat!:boolean;
}
