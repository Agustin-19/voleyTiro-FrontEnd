import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: [
  ]
})
export class PlayersComponent implements OnInit {

  public user!: IUser;
  public esAdministrador: boolean = false;
  userSubscription: Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();

  constructor(
    private _galletita: GalletitaService,
    private _user: UserService,
    private _auth: AuthService,
    private _globalProvider: GlobalProviderService,
    private router: Router,
  ) { }

  get haySesion() {
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
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
