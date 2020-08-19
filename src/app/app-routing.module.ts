import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayerComponent } from './player/player.component';
import { AlbumsComponent } from './albums/albums.component';
import { AllComponent } from './all/all.component';
import { RecentComponent } from './recent/recent.component';
import { ArtistComponent } from './artist/artist.component';
import { GenresComponent } from './genres/genres.component';
import { YearComponent } from './year/year.component';


const routes: Routes = [
  {path: '', redirectTo: '/all', pathMatch: 'full'},
  {path: 'home', redirectTo: '/all', pathMatch: 'full'},
  {path: 'recent', component: RecentComponent},
  {path: 'all', component: AllComponent},
  {path: 'album', component: AlbumsComponent},
  {path: 'artist', component: ArtistComponent},
  {path: 'genres', component: GenresComponent},
  {path: 'year', component: YearComponent},
  {path: 'player', component: PlayerComponent},
  {path: '**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
