import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IClub } from 'src/app/Interfaces/club.interface';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styles: [
  ]
})
export class ClubsComponent implements OnInit {
  
  public user!: IUser;
  public esAdministrador: boolean = false;
  userSubscription: Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();

  public club$!: IClub[];
  public sede!: string;

  private club!: IClub;

  
  constructor(
    private _club: ClubService,
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
    this.getClub();
    this.buscarSesion();
  }
  getClub() {
    this._club.getAllClub().subscribe((resp : any)=> {
      this.club$ = resp
      this.club = this.club$[0]

      this.club.sede.forEach(element => {
        element.direccion
        // console.log(element);
      });
      
      // console.log(this.club.sede[0].direccion)
    });
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
