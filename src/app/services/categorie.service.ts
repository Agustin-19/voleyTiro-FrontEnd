import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory, MenuCategory } from '../Interfaces/categorie.interface';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private _http: HttpClient) {}

  traerCategoria = () => this._http.get(`${environment.API_URL}categories`)
  getCategoria = () => this._http.get<ICategory>(`${environment.API_URL}categories`);
  getCategories(): Observable<MenuCategory[]>{
		return this._http.get<{ categories: MenuCategory[] }>(`${environment.API_URL}categories`)
      .pipe(
        map(res => res.categories),
        catchError(error => {
          // Manejar errores aquí si es necesario
          console.error('Error al obtener categorías', error);
          throw error; // Puedes lanzar el error nuevamente para que el componente lo maneje
        })
      );
	}
}
