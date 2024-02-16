import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor ( private _http: HttpClient ){}
        createUser = ( body: IUser) => this._http.post(environment.API_URL + 'user/',body);
        getUserById = (uid:string | undefined) => this._http.get<any>(`${environment.API_URL}user/${uid}`);
        updateUserById = (uid: string |undefined, body: IUser) => this._http.put(`${environment.API_URL}user/${uid}`, body);
        deleteUser = (uid: string | undefined) => this._http.delete(`${environment.API_URL}user/${uid}/`)
    }

