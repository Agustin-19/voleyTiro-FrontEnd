import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuspice } from '../Interfaces/auspice.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuspiceService {

  constructor(private _http: HttpClient) { }
  createAuspice = (body: IAuspice) => this._http.post(`${environment.API_URL}publicity`, body);
  getAllAuspice = () => this._http.get<IAuspice[]>(`${environment.API_URL}publicity`);
}
