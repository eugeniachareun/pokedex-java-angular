import { Tipo } from "./tipo.model";

export class Pokemon{

  constructor(public idPkmn? : number, public nroPkmn? : string,
              public nombre? : string, public tipo1? : Tipo,
              public tipo2? : Tipo , public descripcion? : string,
              public mostrar? : boolean){}

}
