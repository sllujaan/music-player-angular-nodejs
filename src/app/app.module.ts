import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayerComponent } from './player/player.component';
import { AlbumsComponent } from './albums/albums.component';
import { AllComponent } from './all/all.component';
import { RecentComponent } from './recent/recent.component';
import { ArtistComponent } from './artist/artist.component';
import { GenresComponent } from './genres/genres.component';
import { YearComponent } from './year/year.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PlayerComponent,
    AlbumsComponent,
    AllComponent,
    RecentComponent,
    ArtistComponent,
    GenresComponent,
    YearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
