import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuCategory, ICategory } from 'src/app/Interfaces/categorie.interface';
import { IGame } from 'src/app/Interfaces/game.interface';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GameService } from 'src/app/services/game.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styles: [
  ]
})
export class GameCardComponent implements OnInit {


  public user!: IUser;
  public esAdministrador: boolean = false;
  userSubscription: Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();


  @Input() gameDatos!: IGame[];
  public partidoId!: string;

  constructor(
    private router: Router,
    private _galletita: GalletitaService,
    private _user: UserService,
    private _auth: AuthService,
    private _globalProvider: GlobalProviderService,
  ) { }

  get haySesion() {
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.buscarSesion()
  }

  editarPartido(idGame: any){
    const partido = this.gameDatos[idGame]as any;
    this.partidoId = partido['_id'];
    this.router.navigate(['/admin/game/forms', this.partidoId])
    // console.log(partido);
    
  }

  buscarSesion() {
    if (this.haySesion) {
      const cookie: IUser = this._galletita.getCookie('_lg');

      this._user.getUserById(cookie.google_uid).subscribe(response => {
        this.user = response;
        this.esAdministrador = this.user.roles?.filter(r => r === 'administrador').length === 1;
        // this.esSuperuser = this.user.roles?.filter(r => r === 'SuperUsuario').length === 1;
        // console.log(this.esAdministrador);
        // console.log(this.user.roles);


      })
      this.userSubscription = this._globalProvider
        .escucharDatosUsuario()
        .asObservable()
        .subscribe(response => {
          this.user = response;
        })

      this.logoutSubscription = this._globalProvider
        .escucharLogout()
        .asObservable()
        .subscribe(response => {
          if (response) {
            this.esAdministrador = false;
            this.user = {
              username: '',
              userlastname: '',
              email: '',
              password: '',
              passwordconf: '',
              google_uid: '',
              roles: [],
            }
          }
        })

    } 
  }

}
