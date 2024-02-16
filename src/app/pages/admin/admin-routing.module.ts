import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClubAdminComponent } from 'src/app/components/admin/club-admin/club-admin.component';
import { GamesAdminComponent } from 'src/app/components/admin/games-admin/games-admin.component';
import { NewsAdminComponent } from 'src/app/components/admin/news-admin/news-admin.component';
import { PlayersAdminComponent } from 'src/app/components/admin/players-admin/players-admin.component';
import { PublicityAdminComponent } from 'src/app/components/admin/publicity-admin/publicity-admin.component';
import { TimetebleAdminComponent } from 'src/app/components/admin/timeteble-admin/timeteble-admin.component';

const ADMIN_ROUTES : Routes = [
  { path: '', component: AdminComponent },
  {
    path:'',
    component: AdminComponent,
    children:[
      {
        path:'club',
        component: ClubAdminComponent,
        data:{ title: 'Equipo'},
      },
      {
        path: 'game',
        component: GamesAdminComponent,
        data:{ title: 'Partido'},
      },
      {
        path: 'news',
        component: NewsAdminComponent,
        data: {title: 'Noticia'},
      },
      {
        path: 'player',
        component: PlayersAdminComponent,
        data: {title: 'Jugador'},
      },
      {
        path: 'publicity',
        component: PublicityAdminComponent,
        data: { title: 'Publicidad'},
      },
      {
        path: 'timetable',
        component: TimetebleAdminComponent,
        data: {title: 'Horario'},
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
