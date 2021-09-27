import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  busquedaInput! : string;

  constructor(private pkmnService : PokemonService) { }

  ngOnInit(): void {
  }

  onBuscar(){
    this.busquedaInput = this.busquedaInput.trim();
    const regex = /^[0-9]*$/;

    if(regex.test(this.busquedaInput)){
      this.pkmnService.obtenerPokemonPorNro(this.busquedaInput);
    } else {
      this.pkmnService.obtenerPokemonPorNombre(this.busquedaInput);
    }
  }
}
