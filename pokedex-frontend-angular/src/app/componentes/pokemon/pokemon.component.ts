import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon.model';

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
      let idPreviousPkmn : number = this.pkmn.idPkmn! - 1;
      this.pkmnService.recuperarPokemonPorId(idPreviousPkmn).subscribe(
          (pkmnRecuperado : any) => {
            this.previousPkmn = pkmnRecuperado;
            console.log('Pokemon recuperado por el ID desde la base de datos: ' + pkmnRecuperado);
          }
        );
      }

  recuperarNextPkmn(){
    //Si el pokemon NO es el último, recupera el pokemon siguiente
      let idNextPkmn : number = this.pkmn.idPkmn! + 1;
      this.pkmnService.recuperarPokemonPorId(idNextPkmn).subscribe(
        (pkmnRecuperado : Pokemon) => {
          this.nextPkmn = pkmnRecuperado;
          console.log('Pokemon recuperado por el ID desde la base de datos: ' + pkmnRecuperado);
        }
      );
    }

}
