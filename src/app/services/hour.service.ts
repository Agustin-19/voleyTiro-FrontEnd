import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHour } from '../Interfaces/hour.interface';

@Injectable({
  providedIn: 'root'
})
export class HourService {

  constructor(private _http: HttpClient) { }
  createHour = (body: IHour) => this._http.post(`${environment.API_URL}timetable`, body);
  getAllHour = () => this._http.get<IHour[]>(`${environment.API_URL}timetable`);
}
