import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styles: [],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private pkmnService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pkmnService.obtenerPokemons().subscribe((pokemonsObtenidos: any) => {
      this.pokemons = pokemonsObtenidos;
      this.pkmnService.setPokemons(this.pokemons);
      console.log('Pokemons recuperados de la base de datos: ' + pokemonsObtenidos);
    });
  }
}
