import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StartComponent } from '../../components/home/start/start.component';
import { PlayersComponent } from '../../components/home/players/players.component';
import { NewsComponent } from '../../components/home/news/news.component';
import { GamesComponent } from '../../components/home/games/games.component';
import { CarouselComponent } from '../../components/shared/carousel/carousel.component';
import { InstitutionalComponent } from '../../components/home/institutional/institutional.component';
import { ViewNewsComponent } from '../../components/home/news/view-news/view-news.component';
import { CardNewsComponent } from 'src/app/components/shared/card-news/card-news.component';
import { ListNewsComponent } from '../../components/home/news/list-news/list-news.component';
import { BtnAddComponent } from '../../components/shared/btn-add/btn-add.component';
import { ClubsComponent } from '../../components/home/clubs/clubs.component';
import { TablePlayersComponent } from '../../components/shared/table-players/table-players.component';
import { FormsModule } from '@angular/forms';
import { ClubCardComponent } from '../../components/shared/club-card/club-card.component';
import { GameCardComponent } from '../../components/shared/game-card/game-card.component';
import { AuspiceCardComponent } from '../../components/shared/auspice-card/auspice-card.component';
import { TableHourComponent } from '../../components/shared/table-hour/table-hour.component';

@NgModule({
  declarations: [
    HomeComponent,
    StartComponent,
    PlayersComponent,
    NewsComponent,
    GamesComponent,
    CarouselComponent,
    InstitutionalComponent,
    ViewNewsComponent,
    CardNewsComponent,
    ListNewsComponent,
    BtnAddComponent,
    ClubsComponent,
    TablePlayersComponent,
    ClubCardComponent,
    GameCardComponent,
    AuspiceCardComponent,
    TableHourComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
