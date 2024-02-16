import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGame } from '../Interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  game_SaveMatch = (dataGame: IGame) => this.http.post(`${environment.API_URL}game`, dataGame);
  game_GetMatch = () => this.http.get<IGame[]>(`${environment.API_URL}game`);
  game_GetId = (id: string | undefined) => this.http.get<IGame>(`${environment.API_URL}game/${id}`);
  game_UpdateMatch = (id: string |undefined, body: IGame) => this.http.put(`${environment.API_URL}game/${id}`, body);
}
