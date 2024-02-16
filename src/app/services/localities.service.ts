import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad } from '../Interfaces/localities.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalitiesService {

  constructor(private http: HttpClient) { }
  // pagina de donde salio la api
  // https://datosgobar.github.io/georef-ar-api/open-api/
  traer_localidad = (localidad: string, provincia: string) => this.http.get<Localidad>(`https://apis.datos.gob.ar/georef/api/localidades?nombre=${localidad}&provincia=${provincia}&municipio=${localidad}&localidad_censal=${localidad}&orden=nombre&aplanar=true&campos=estandar&max=10`);

}
