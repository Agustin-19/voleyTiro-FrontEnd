import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClub } from '../Interfaces/club.interface';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor( private _http: HttpClient) { }
  createClub = (body: IClub) => this._http.post(`${environment.API_URL}club/`, body);
  getClubId = (id: string | undefined) => this._http.get<IClub>(`${environment.API_URL}club/${id}`);
  updateUserById = (id: string |undefined, body: IClub) => this._http.put(`${environment.API_URL}club/${id}`, body);
  deleteUser = (id: string | undefined) => this._http.delete(`${environment.API_URL}club/${id}`);
  getAllClub = () => this._http.get<IClub[]>(`${environment.API_URL}club`);
}
