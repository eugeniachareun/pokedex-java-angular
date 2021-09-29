import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/model/pokemon.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  busquedaInput!: string;
  pkmn: Pokemon | undefined;

  constructor(private pkmnService: PokemonService, private router: Router) {}

  ngOnInit(): void {
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
}
