import { User } from "./user";

export class Reclamation {
  public id!:any;
  public objet!: String;
  public message!: String;
  public dateTraitement!: Date;
  public dateEnvoi!: Date;
  public statut!: boolean;
  public user!:User;
}
