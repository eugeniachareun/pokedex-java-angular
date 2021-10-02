import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/model/pokemon.model';
import { Tipo } from 'src/app/model/tipo.enum';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  //Búsqueda de pokemon
  busquedaInput!: string;
  pkmn: Pokemon | undefined;

  //Filtrado por tipo
  visibilidadFiltro : boolean = false;
  visibilidadLista : boolean = false;
  tipoInput! : Tipo;
  tipoKeys = Object.keys(Tipo);
  tipoValues = Object.values(Tipo);
  arrayTipo1! : Pokemon[];
  arrayTipo2! : Pokemon[];

  //Pokemon random
  pkmnRandom! : Pokemon;
  visibilidadRandom : boolean = false;


  constructor(private pkmnService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    //Setea el arreglo pokemons de pkmnService
    this.pkmnService.obtenerPokemons().subscribe(
      (pokemonsObtenidos: any) => {
      this.pkmnService.setPokemons(pokemonsObtenidos);
      console.log('Pokemons recuperados de la base de datos: ' + pokemonsObtenidos);
    });

    //Genera pokemon random
    this.generarRandom();
  }

  onBuscar() {
    this.busquedaInput = this.busquedaInput!.trim();
    const regex = /^[0-9]*$/;

    //Si el string a buscar es un número, se llama a zeroFill y se ejecuta la búsqueda por número.
    //Si es un string de letras, se busca por nombre.
    if (regex.test(this.busquedaInput)) {
      this.busquedaInput = this.pkmnService.zeroFill(parseInt(this.busquedaInput));
      this.pkmnService.recuperarPokemonPorNro(this.busquedaInput).subscribe(
        (pkmnRecuperado : any) => {
          this.pkmn = pkmnRecuperado;
        }
      )

    } else {
      this.pkmnService.recuperarPokemonPorNombre(this.busquedaInput).subscribe(
        (pkmnRecuperado : any) => {
          this.pkmn = pkmnRecuperado;
        }
      )
    }

    if (this.pkmn != null) {
      const nombrePkmn: string = this.pkmn.nombre!;
      this.router.navigate(['/', nombrePkmn]);
    }
  }

  verFiltro(){
    this.visibilidadRandom = false;
    this.visibilidadFiltro = true;
  }

  ocultarFiltro(){
    this.visibilidadLista = false;
    this.visibilidadFiltro = false;
  }

  onFiltrar(){
    this.arrayTipo1 = this.pkmnService.obtenerPokemonsPorTipo1(this.tipoInput);
    this.arrayTipo2 = this.pkmnService.obtenerPokemonsPorTipo2(this.tipoInput);

    this.visibilidadLista = true;
  }

  iniciarRandom(){
    this.mostrarRandom();
    this.generarRandom();
  }

  mostrarRandom(){
    this.visibilidadFiltro = false;
    this.visibilidadLista = false;
    this.generarRandom();
    this.visibilidadRandom = true;
  }

  ocultarRandom(){
    this.visibilidadRandom = false;
  }

  generarRandom(){
    this.pkmnService.obtenerPokemonRandom().subscribe(
      (pokemon : any) => this.pkmnRandom = pokemon
    );
  }

}
