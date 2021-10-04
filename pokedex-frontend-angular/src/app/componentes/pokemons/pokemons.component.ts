import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon.model';
import { Tipo } from 'src/app/model/tipo.enum';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styles: [],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];

  //Nuevo pokemon
  visibilidadModal: boolean = false;
  //Input
  nombreInput! : string;
  nroInput! : string;
  tipo1Input! : Tipo;
  tipo2Input!: Tipo;
  descripcionInput! : string;
  //Tipos
  tipo! : Tipo;
  tipoKeys = Object.keys(Tipo);
  tipoValues = Object.values(Tipo);

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

  mostrarModal(){
    this.visibilidadModal = true;
  }

  ocultarModal(){
    this.visibilidadModal = false;
  }

  nuevoPkmn(){

    //Crea el pokemon a partir del formulario
    const pkmnForm : Pokemon = new Pokemon(this.tipo1Input, this.tipo2Input,
      undefined, this.nroInput,
      this.nombreInput, this.descripcionInput);


    //Llama al servicio
    this.pkmnService.agregarPokemon(pkmnForm);

    //Oculta el modal
    this.ocultarModal();

    //Refresh
    this.ngOnInit();
  }
}
