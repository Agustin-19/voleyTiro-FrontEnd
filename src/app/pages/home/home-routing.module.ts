import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StartComponent } from 'src/app/components/home/start/start.component';
import { GamesComponent } from 'src/app/components/home/games/games.component';
import { PlayersComponent } from 'src/app/components/home/players/players.component';
import { NewsComponent } from 'src/app/components/home/news/news.component';
import { InstitutionalComponent } from 'src/app/components/home/institutional/institutional.component';
import { ViewNewsComponent } from 'src/app/components/home/news/view-news/view-news.component';
import { ListNewsComponent } from 'src/app/components/home/news/list-news/list-news.component';
import { ClubsComponent } from 'src/app/components/home/clubs/clubs.component';

const HOME_ROUTES : Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: '',
    component:HomeComponent,
    children:[
      {
        path: 'start',
        component: StartComponent,
        data: {title: 'Inicio'},
      },
      {
        path: 'clubs',
        component: ClubsComponent,
        data: {title: 'Clubes'},
      },
      {
        path: 'games',
        component: GamesComponent,
        data: {title: 'Partidos'},
      },
      {
        path: 'players',
        component: PlayersComponent,
        data: {title: 'Jugadores'},
      },
      {
        path: 'news',
        component: NewsComponent,
        children:[
          {
            path: '', redirectTo: 'list', pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListNewsComponent,
            data: {title: 'Noticias'}
          },
          {
            path: 'view/:newsId',
            component: ViewNewsComponent,
            data: { title: 'Noticia' },
          }
        ]
      },
      {
        path: 'inst',
        component: InstitutionalComponent,
        data: {title: 'Institucional'},
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
