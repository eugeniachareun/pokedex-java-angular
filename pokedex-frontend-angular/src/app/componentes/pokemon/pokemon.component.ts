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
      }
    );

    //Si el pokemon NO es el último, recupera el pokemon siguiente
    if(this.pkmn.nroPkmn != '151'){
      let idNextPkmn : number = this.pkmn.idPkmn! + 1;
      this.pkmnService.recuperarPokemonPorId(idNextPkmn).subscribe(
        (pkmnRecuperado : any) => {
          this.nextPkmn = pkmnRecuperado;
          console.log('Pokemon recuperado por el ID desde la base de datos: ' + pkmnRecuperado);
        }
      );
    }
  }

}
