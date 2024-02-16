import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PlayersAdminComponent } from '../../components/admin/players-admin/players-admin.component';
import { ClubAdminComponent } from '../../components/admin/club-admin/club-admin.component';
import { GamesAdminComponent } from '../../components/admin/games-admin/games-admin.component';
import { NewsAdminComponent } from '../../components/admin/news-admin/news-admin.component';
import { TimetebleAdminComponent } from '../../components/admin/timeteble-admin/timeteble-admin.component';
import { PublicityAdminComponent } from '../../components/admin/publicity-admin/publicity-admin.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    PlayersAdminComponent,
    ClubAdminComponent,
    GamesAdminComponent,
    NewsAdminComponent,
    TimetebleAdminComponent,
    PublicityAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
