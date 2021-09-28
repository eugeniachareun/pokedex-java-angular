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


  constructor(private pkmnService : PokemonService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nombre = this.route.snapshot.params['nombre'];
    this.pkmnService.recuperarPokemonPorNombre(this.nombre).subscribe(
      (pkmnRecuperado : any) => {
        this.pkmn = pkmnRecuperado;
        console.log('Pokemon recuperado por nombre de la base de datos: ' + pkmnRecuperado);
      }
    );
  }

}
