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

  obtenerPokemonPorId(idPkmn : number){
    const pkmn = this.pokemons.find(pokemon => pokemon.idPkmn == idPkmn);
    console.log('ID pokemon encontrado: ' + pkmn?.idPkmn + pkmn?.nombre);
    return pkmn;
  }

  obtenerPokemonPorNro(nroPkmn : number){
    const pkmn = this.pokemons.find(pokemon => pokemon.nroPkmn == nroPkmn);
    console.log('Nro pokemon encontrado: ' + pkmn?.nroPkmn + pkmn?.nombre);
    return pkmn;
  }

  obtenerPokemonPorNombre(nombre : string){

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
