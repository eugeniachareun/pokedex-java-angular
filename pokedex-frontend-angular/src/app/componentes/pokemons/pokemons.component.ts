import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styles: [],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pkmnService: PokemonService) {}

  ngOnInit(): void {
    this.pkmnService.obtenerPokemons().subscribe(
      (pokemonsObtenidos: any) => {
      this.pokemons = pokemonsObtenidos;
      this.pokemons.sort((a, b) => a.nroPkmn!.localeCompare(b.nroPkmn!));
      this.pkmnService.setPokemons(this.pokemons);
      console.log('Pokemons recuperados de la base de datos: ' + pokemonsObtenidos);
    });
  }
}
