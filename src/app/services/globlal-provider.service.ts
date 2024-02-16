import { EventEmitter, Injectable } from '@angular/core';
import { IUser } from '../Interfaces/user.interface';
import { IClub } from '../Interfaces/club.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  constructor() { }

  private anyEmitter: EventEmitter<any> = new EventEmitter();
  private logoutEmitter: EventEmitter<boolean> = new EventEmitter();
  private clubDataEventEmitter: EventEmitter<IClub> = new EventEmitter();
  private usuarioDatosEventEmitter: EventEmitter<IUser> = new EventEmitter();
  
  public escucharAny = () => this.anyEmitter;
  public escucharLogout = () => this.logoutEmitter;  
  public escucharDatosClub = () => this.clubDataEventEmitter;
  public escucharDatosUsuario = () => this.usuarioDatosEventEmitter;

  public enviarAny = (key:string,value:any) => this.anyEmitter.emit({key,value});
  public enviarLogout = () => this.logoutEmitter.emit(true);
  public enviarDatosClub = (datosClub: IClub) => this.clubDataEventEmitter.emit(datosClub);
  public enviarDatosUsuario = (datosUsuario: IUser) => this.usuarioDatosEventEmitter.emit(datosUsuario);

}
