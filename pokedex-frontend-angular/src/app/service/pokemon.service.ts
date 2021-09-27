import { Tipo } from './../model/tipo.model';
import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { DataService } from './data.service';

@Injectable()
export class PokemonService{
  pokemons : Pokemon[] = [];

  constructor(private dataService : DataService){}

  setPokemons(pokemons : Pokemon[]){
    this.pokemons = pokemons;
  }

  obtenerPokemons(){
    return this.dataService.getAllPokemons();
  }

  obtenerPokemonsPorTipo(tipo : Tipo){
    return this.dataService.getAllPokemonsByTipo(tipo);
  }

  obtenerPokemonPorId(idPkmn : number){
    return this.dataService.getPokemonById(idPkmn);
  }

  obtenerPokemonPorNro(nroPkmn : number){
    return this.dataService.getPokemonByNro(nroPkmn);
  }

  obtenerPokemonPorNombre(nombre : string){
    return this.dataService.getPokemonByNombre(nombre);
  }

  obtenerPokemonRandom(){
    return this.dataService.getRandomPokemon();
  }

  agregarPokemon(pkmn : Pokemon){
    console.log('Pokemon a agregar: ' + pkmn.nombre);
    this.dataService.insertPokemon(pkmn).subscribe(
      (pokemon : Pokemon ) => {
        console.log('ID pokemon agregado: ' + pokemon.idPkmn);
        this.pokemons.push(pokemon);
      }
    );
  }


}
