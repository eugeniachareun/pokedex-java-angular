import { Tipo } from "../model/tipo.model";

export class TipoService{

  tipos : Tipo [] = [
    new Tipo(1,'Acero'),
    new Tipo(2, 'Agua'),
    new Tipo(3, 'Bicho'),
    new Tipo(4, 'Dragon'),
    new Tipo(5, 'Eléctrico'),
    new Tipo(6, 'Fantasma'),
    new Tipo(7, 'Fuego'),
    new Tipo(8, 'Hada'),
    new Tipo(9, 'Hielo'),
    new Tipo(10, 'Lucha'),
    new Tipo(11, 'Normal'),
    new Tipo(12, 'Planta'),
    new Tipo(13, 'Psíquico'),
    new Tipo(14, 'Roca'),
    new Tipo(15, 'Siniestro'),
    new Tipo(16, 'Tierra'),
    new Tipo(17, 'Veneno'),
    new Tipo(18, 'Volador'),
    new Tipo(19, 'No tiene segundo tipo')
  ];

  getArreglo(): Tipo[]{
    return this.tipos;
  }

  buscarTipoPorId(idTipo : number){
    const tipo = this.tipos.find(tipo => tipo.idTipo == idTipo);
    console.log('Tipo encontrado por ID');
    return tipo;
  }
}
