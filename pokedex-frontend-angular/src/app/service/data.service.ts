import { Pokemon } from './../model/pokemon.model';
import { Tipo } from './../model/tipo.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataService{

  //TODO cambiar url para deploy
  urlBase : string = 'http://localhost:8080/pokedex-backend-java/webservice/pokemons';

  constructor(private httpClient : HttpClient){}

  getAllPokemons(){
    return this.httpClient.get(this.urlBase);
  }

  getRandomPokemon(){
    return this.httpClient.get(this.urlBase + '/random');
  }

  insertPokemon(pkmn : Pokemon){
    return this.httpClient.post(this.urlBase, pkmn);
  }

  updatePokemon(idPkmn : number , pkmnModificado : Pokemon){
    let url:string = this.urlBase + '/' + idPkmn;
    return this.httpClient.put(url, pkmnModificado).subscribe(
      response => console.log('Respuesta al modificar pkmn: ' + response),
      error => console.log('Error al modificar pkmn: ' + error )
    );
  }

  // TODO incorporar método a la funcionalidad de la página
  changeVisibilityPokemon(idPkmn : number){
    let url = this.urlBase + '/visibility' + idPkmn;
    return this.httpClient.get(url);
  }

  deletePokemon(idPkmn : number){
    return this.httpClient.delete(this.urlBase + '/' + idPkmn);
  }
}

function firstCharToUpperCase(string : string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
