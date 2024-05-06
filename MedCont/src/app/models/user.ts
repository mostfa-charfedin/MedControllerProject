export class User {
  public id!:any;
  public username: string | undefined;
  public password: string | undefined;
  public roles:string[] | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public matricule: string | undefined;
  public tel: string | undefined;
  public email: string | undefined;
  public localisation: string | undefined;
  public specialite: string | undefined;
  public isActive: boolean | undefined;
  public demandeMod: boolean | undefined;
  public cin :number | undefined;
  public birthday: Date | undefined;
}
