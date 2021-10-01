import { TipoService } from './../../service/tipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon.model';
import { NgForm } from '@angular/forms';
import { Tipo } from 'src/app/model/tipo.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styles: [
  ]
})
export class PokemonComponent implements OnInit {
  nombre : string = '';
  pkmn! : Pokemon;
  previousPkmn! : Pokemon;
  nextPkmn! : Pokemon;
  visibilidadModal : boolean = false;
  arrayTipos : Tipo[] = this.tipoService.getArreglo();


  //Atributos de form
  tipo1PkmnForm : string = '';
  tipo2PkmnForm : string = '';

  constructor(private pkmnService : PokemonService,
              private route: ActivatedRoute,
              private tipoService : TipoService,
              private router : Router) { }

  ngOnInit(): void {
    //Recupera el pokemon a partir del nombre
    this.nombre = this.route.snapshot.params['nombre'];
    this.pkmnService.recuperarPokemonPorNombre(this.nombre).subscribe(
      (pkmnRecuperado : any) => {
        this.pkmn = pkmnRecuperado;
        console.log('Pokemon recuperado por nombre desde la base de datos: ' + pkmnRecuperado);

        //Si el pokemon NO es el primero, recupera el pokemon anterior
        if(this.pkmn.nroPkmn != '001'){
          this.recuperarPreviousPkmn();
        }
        //Si el pokemon NO es el último, recupera el pokemon siguiente
        if(this.pkmn.nroPkmn! != '151'){
          this.recuperarNextPkmn();
        }
      }
    );

    //Inicializa atributos de form con valores del pokemon convertidos a string
    this.tipo1PkmnForm = this.pkmn.tipo1!.idTipo + '';
    this.tipo2PkmnForm = this.pkmn.tipo2!.idTipo + '';
  }

  recuperarPreviousPkmn(){
      const nroPreviousPkmn : number = parseInt(this.pkmn.nroPkmn!) - 1;
      const strPreviousPkmn : string = this.pkmnService.zeroFill(nroPreviousPkmn);
      this.pkmnService.recuperarPokemonPorNro(strPreviousPkmn).subscribe(
          (pkmnRecuperado : any) => {
            this.previousPkmn = pkmnRecuperado;
            console.log('Pokemon recuperado por el número desde la base de datos: ' + pkmnRecuperado);
          }
        );
      }

  recuperarNextPkmn(){
      const nroNextPkmn : number = parseInt(this.pkmn.nroPkmn!) + 1;
      const strNextPkmn : string = this.pkmnService.zeroFill(nroNextPkmn);
      this.pkmnService.recuperarPokemonPorNro(strNextPkmn).subscribe(
        (pkmnRecuperado : Pokemon) => {
          this.nextPkmn = pkmnRecuperado;
          console.log('Pokemon recuperado por el número desde la base de datos: ' + pkmnRecuperado);
        }
      );
    }

  mostrarModal(){
    this.visibilidadModal = true;
  }

  ocultarModal(){
    this.visibilidadModal = false;
  }

  guardarPokemon(){
    //Recupera los tipos a partir de sus ID
    const tipo1: Tipo | undefined = this.tipoService.buscarTipoPorId(parseInt(this.tipo1PkmnForm));
    const tipo2: Tipo | undefined = this.tipoService.buscarTipoPorId(parseInt(this.tipo2PkmnForm));

    //Crea el pokemon a partir del formulario
    const pkmnForm : Pokemon = new Pokemon(this.pkmn.idPkmn, this.pkmn.nroPkmn, this.pkmn.nombre,
                                          tipo1, tipo2, this.pkmn.descripcion);

    //Llama al servicio
    this.pkmnService.modificarPokemon(this.pkmn.idPkmn!, pkmnForm);

    //Oculta el modal
    this.ocultarModal();
  }

  onEliminarPkmn(){
    const str = '¿Desea eliminar el registro de ' + this.pkmn.nombre +'?';
    if(confirm(str)){
      this.pkmnService.eliminarPokemon(this.pkmn.idPkmn!);
      this.router.navigate(['/']);
    }
  }
}
