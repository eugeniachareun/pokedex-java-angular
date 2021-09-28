import { Tipo } from './../model/tipo.model';
import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { DataService } from './data.service';

@Injectable()
export class PokemonService{
  pokemons : Pokemon[] = [];
  pokemonsTipo1 : Pokemon[] = [];
  pokemonsTipo2 : Pokemon[] = [];

  constructor(private dataService : DataService){}

  setPokemons(pokemons : Pokemon[]){
    this.pokemons = pokemons;
  }

  obtenerPokemons(){
    return this.dataService.getAllPokemons();
  }

  obtenerPokemonsPorTipo1(tipo : Tipo){
    let idTipo = tipo.idTipo;
    this.pokemonsTipo1 = this.pokemons.filter(pokemon => pokemon.tipo1?.idTipo == idTipo);
  }

  obtenerPokemonsPorTipo2(tipo : Tipo){
    let idTipo = tipo.idTipo;
    this.pokemonsTipo2 = this.pokemons.filter(pokemon => pokemon.tipo2?.idTipo == idTipo);
  }

  obtenerPokemonPorId(idPkmn : number){
    const pkmn = this.pokemons.find(pokemon => pokemon.idPkmn == idPkmn);
    console.log('ID pokemon recuperado: ' + pkmn?.idPkmn + pkmn?.nombre);
    return pkmn;
  }

  obtenerPokemonPorNro(nroPkmn : string){
    const pkmn = this.pokemons.find(pokemon => pokemon.nroPkmn == nroPkmn);
    console.log('Nro pokemon recuperado: ' + pkmn?.nroPkmn + pkmn?.nombre);
    return pkmn;
  }

  obtenerPokemonPorNombre(nombre : string){
    let nombreMayus = firstCharToUpperCase(nombre);
    let pkmn = this.pokemons.find(pokemon => pokemon.nombre == nombreMayus);
    console.log('Pokemon recuperado por nombre: ' + pkmn?.nombre);
  }

  recuperarPokemonPorNombre(nombre : string){
    let pkmn = this.dataService.getPokemonByNombre(nombre);
    return pkmn;
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

  modificarPokemon(idPkmn : number, pkmn : Pokemon){
    console.log('Se modificará el pokemon con id: ' + idPkmn);
    this.dataService.updatePokemon(idPkmn, pkmn);
  }

  // TODO incorporar método a la funcionalidad de la página
  cambiarVisibilidadPokemon(idPkmn : number){
    this.dataService.changeVisibilityPokemon(idPkmn);
  }

  eliminarPokemon(idPkmn : number){
    console.log('Se eliminará el pokemon con id: ' + idPkmn);

    //Eliminación del pokemon del arreglo general
    const index = this.pokemons.findIndex(pokemon => pokemon.idPkmn == idPkmn);
    this.pokemons.splice(index, 1);

    //Eliminación del pokemon de los arreglos de tipos
    if(this.pokemonsTipo1 != null){
      const index = this.pokemonsTipo1.findIndex(pokemon => pokemon.idPkmn == idPkmn);
      this.pokemonsTipo1.splice(index, 1);
    }
    if(this.pokemonsTipo2 != null){
      const index = this.pokemonsTipo2.findIndex(pokemon => pokemon.idPkmn == idPkmn);
      this.pokemonsTipo2.splice(index, 1);
    }

    //Eliminación del pokemon de la base de datos
    this.dataService.deletePokemon(idPkmn);
  }

}

function firstCharToUpperCase(string : string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
