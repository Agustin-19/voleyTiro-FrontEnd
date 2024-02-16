import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPlayer } from '../Interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private  _http: HttpClient) { }
  createPlayer = (body: IPlayer) => this._http.post(`${environment.API_URL}player/`, body);
  getPlayerId = (id: string | undefined) => this._http.get<any>(`${environment.API_URL}player/${id}`);
  updateplayerById = (id: string |undefined, body: IPlayer) => this._http.put(`${environment.API_URL}player/${id}`, body);
  deletePlayer = (id: string | undefined) => this._http.delete(`${environment.API_URL}player/${id}`);
  getAllPlayers = () => this._http.get<IPlayer[]>(`${environment.API_URL}player`);
}
