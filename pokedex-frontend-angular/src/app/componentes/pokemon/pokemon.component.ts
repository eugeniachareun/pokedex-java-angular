import { ActivatedRoute } from '@angular/router';
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

  //Atributos de form
  nombrePkmnForm! :string;
  nroPkmnForm! : string;
  tipo1PkmnForm! : string;
  tipo2PkmnForm! : string;
  descripcionPkmnForm! :string


  constructor(private pkmnService : PokemonService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Recupera el pokemon a partir del nombre
    this.nombre = this.route.snapshot.params['nombre'];
    this.pkmnService.recuperarPokemonPorNombre(this.nombre).subscribe(
      (pkmnRecuperado : any) => {
        this.pkmn = pkmnRecuperado;
        console.log('Pokemon recuperado por nombre desde la base de datos: ' + pkmnRecuperado);

        if(this.pkmn.nroPkmn != '001'){
          this.recuperarPreviousPkmn();
        }
        if(this.pkmn.nroPkmn! != '151'){
          this.recuperarNextPkmn();
        }
      }
    );
  }

  recuperarPreviousPkmn(){
    //Si el pokemon NO es el primero, recupera el pokemon anterior
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
    //Si el pokemon NO es el último, recupera el pokemon siguiente
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
    //Recupera los tipos
    const tipo1 : Tipo = new Tipo(parseInt(this.tipo1PkmnForm));
    const tipo2 : Tipo = new Tipo(parseInt(this.tipo2PkmnForm));

    //Crea el pokemon a partir del formulario
    const pkmnForm : Pokemon = new Pokemon(this.pkmn.idPkmn, this.nroPkmnForm, this.nombrePkmnForm,
                                          tipo1, tipo2, this.descripcionPkmnForm);

    //Llama al servicio
    this.pkmnService.modificarPokemon(this.pkmn.idPkmn!, pkmnForm);
  }

}
