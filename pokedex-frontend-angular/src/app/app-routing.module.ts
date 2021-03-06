import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { PokemonComponent } from './componentes/pokemon/pokemon.component';
import { PokemonsComponent } from './componentes/pokemons/pokemons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';


const routes: Routes = [
  {path: '', component: BusquedaComponent},
  {path: 'all', component: PokemonsComponent},
  {path: ':nombre', component: PokemonComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
