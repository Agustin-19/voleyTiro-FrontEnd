import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INews } from '../Interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private  _http: HttpClient) { }
  createNews = (body: INews) => this._http.post(`${environment.API_URL}news/`, body);
  updateNews = (id: string |undefined, body: INews) => this._http.put(`${environment.API_URL}news/${id}`, body);
  deleteNews = (id: string | undefined) => this._http.delete(`${environment.API_URL}news/${id}`);
  getAllNews = () => this._http.get<INews[]>(`${environment.API_URL}news/all`);
  getNews = (page: number) => this._http.get<INews[]>(`${environment.API_URL}news?page=${page}`);
  getNewsId = (id: string | undefined) => this._http.get<INews>(`${environment.API_URL}news/${id}`);

}
