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
  HeaderComponent,
  FooterComponent,
  RandomComponent,
  PokemonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
