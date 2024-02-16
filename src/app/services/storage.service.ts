import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase)

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();
  constructor() { }

  async subirImagenNoticia(nombre: string, imgBase64: any){

    try {
      let resp = await this.storageRef.child("noticia/"+nombre).putString(imgBase64,'data_url');
      // console.log(resp);
      return await resp.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async subirEscudo(nombre: string, imgBase64: any){

    try {
      let resp = await this.storageRef.child("club/"+nombre).putString(imgBase64,'data_url');
      // console.log(resp);
      return await resp.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
