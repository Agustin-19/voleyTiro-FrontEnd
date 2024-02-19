import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGallery } from '../Interfaces/gallery.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor( private _http: HttpClient) { }

  createGallery = (body: IGallery) =>  this._http.post(`${environment.API_URL}gallery`, body);
  getAllHour = () => this._http.get<IGallery[]>(`${environment.API_URL}gallery`);
}
