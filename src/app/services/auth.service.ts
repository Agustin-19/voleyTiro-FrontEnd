import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _firebase: AngularFireAuth,
  ) { }
  registerUser = (usuario: any) => this._http.post(environment.API_URL + 'auth/register', usuario);
    loginUser = (email: string, password: string) => this._firebase.signInWithEmailAndPassword(email, password);
    logout = () => this._firebase.signOut();
}
