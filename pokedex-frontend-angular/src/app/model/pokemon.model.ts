import { Tipo } from "./tipo.enum";

export class Pokemon{

  constructor(public tipo1 : Tipo, public tipo2 : Tipo,
              public idPkmn? : number, public nroPkmn? : string,
              public nombre? : string, public descripcion? : string,
              public mostrar? : boolean){}

}
