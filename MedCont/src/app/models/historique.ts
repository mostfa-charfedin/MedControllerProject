import { Doc } from "./doc";
import { User } from "./user";

export class Historique {
  public id!:any;
  public action!: String;
  public time!: Date;
  public document:Doc | undefined;
  public user:User | undefined;
}
