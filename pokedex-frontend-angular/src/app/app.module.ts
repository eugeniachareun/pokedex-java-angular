import { TipoService } from './service/tipo.service';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { PokemonComponent } from './componentes/pokemon/pokemon.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { PokemonService } from './service/pokemon.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RandomComponent } from './componentes/random/random.component';
import { PokemonsComponent } from './componentes/pokemons/pokemons.component';

@NgModule({
  declarations: [
  AppComponent,
  BusquedaComponent,
  HeaderComponent,
  FooterComponent,
  RandomComponent,
  PokemonsComponent,
  PokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, PokemonService, TipoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
