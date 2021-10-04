import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon.model';
import { Tipo } from 'src/app/model/tipo.enum';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styles: [],
})
export class PokemonComponent implements OnInit {
  nombre: string = '';
  pkmn!: Pokemon;
  previousPkmn!: Pokemon;
  nextPkmn!: Pokemon;
  visibilidadModal: boolean = false;
  tipo!: Tipo;
  tipoKeys = Object.keys(Tipo);
  tipoValues = Object.values(Tipo);

  //Atributos de form
  tipo1PkmnForm!: Tipo;
  tipo2PkmnForm!: Tipo;

  constructor(
    private pkmnService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Recupera el pokemon a partir del nombre
    this.nombre = this.route.snapshot.params['nombre'];
    this.pkmnService
      .recuperarPokemonPorNombre(this.nombre)
      .subscribe((pkmnRecuperado: any) => {
        if (pkmnRecuperado === null || pkmnRecuperado === undefined) {
          this.router.navigate(['**']);
        } else {
          this.pkmn = pkmnRecuperado;
          console.log(
            'Pokemon recuperado por nombre desde la base de datos: ' +
              pkmnRecuperado
          );

          //Si el pokemon NO es el primero, recupera el pokemon anterior
          if (this.pkmn.nroPkmn != '001') {
            this.recuperarPreviousPkmn();
          }
          //Si el pokemon NO es el último, recupera el pokemon siguiente
          if (this.pkmn.nroPkmn! != '151') {
            this.recuperarNextPkmn();
          }
        }
      });

    //Inicializa atributos de form con valores del pokemon
    this.tipo1PkmnForm = this.pkmn.tipo1;
    this.tipo2PkmnForm = this.pkmn.tipo2;
  }

  recuperarPreviousPkmn() {
    const nroPreviousPkmn: number = parseInt(this.pkmn.nroPkmn!) - 1;
    const strPreviousPkmn: string = this.pkmnService.zeroFill(nroPreviousPkmn);
    this.pkmnService
      .recuperarPokemonPorNro(strPreviousPkmn)
      .subscribe((pkmnRecuperado: any) => {
        this.previousPkmn = pkmnRecuperado;
        console.log(
          'Pokemon recuperado por el número desde la base de datos: ' +
            pkmnRecuperado
        );
      });
  }

  recuperarNextPkmn() {
    const nroNextPkmn: number = parseInt(this.pkmn.nroPkmn!) + 1;
    const strNextPkmn: string = this.pkmnService.zeroFill(nroNextPkmn);
    this.pkmnService
      .recuperarPokemonPorNro(strNextPkmn)
      .subscribe((pkmnRecuperado: any) => {
        this.nextPkmn = pkmnRecuperado;
        console.log(
          'Pokemon recuperado por el número desde la base de datos: ' +
            pkmnRecuperado
        );
      });
  }

  mostrarModal() {
    this.visibilidadModal = true;
  }

  ocultarModal() {
    this.visibilidadModal = false;
  }

  guardarPokemon() {
    //Crea el pokemon a partir del formulario
    const pkmnForm: Pokemon = new Pokemon(
      this.tipo1PkmnForm,
      this.tipo2PkmnForm,
      this.pkmn.idPkmn,
      this.pkmn.nroPkmn,
      this.pkmn.nombre,
      this.pkmn.descripcion
    );

    //Llama al servicio
    this.pkmnService.modificarPokemon(this.pkmn.idPkmn!, pkmnForm);

    //Oculta el modal
    this.ocultarModal();

    //Refresh
    this.ngOnInit();
  }

  onEliminarPkmn() {
    const str = '¿Desea eliminar el registro de ' + this.pkmn.nombre + '?';
    if (confirm(str)) {
      this.pkmnService.eliminarPokemon(this.pkmn.idPkmn!);
      this.router.navigate(['/']);
    }
  }
}
