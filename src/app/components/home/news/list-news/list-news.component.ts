import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAuspice } from 'src/app/Interfaces/auspice.interface';
import { INews } from 'src/app/Interfaces/news.interface';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuspiceService } from 'src/app/services/auspice.service';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styles: [
  ]
})
export class ListNewsComponent implements OnInit {

  news: any[] = [];
  currentPage: number = 1;
  hasNextPage: boolean = true;

  public news$!: INews[];
  public user!: IUser;
  public publi$!: IAuspice[];
  public esAdministrador: boolean = false;
  userSubscription: Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();

  constructor(
    private _notiService: NewsService,
    private _galletita: GalletitaService,
    private _user: UserService,
    private _auth: AuthService,
    private _globalProvider: GlobalProviderService,
    private router: Router,
    private _auspicios: AuspiceService,
  ) { }

  get haySesion() {
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.traerNoticias(1);
    this.buscarSesion();
    this.auspicios();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.traerNoticias(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.traerNoticias(this.currentPage);
    }
  }

  traerNoticias(page: number) {
    this._notiService.getNews(page).subscribe(res => {
      this.news$ = res
      // Verificar si hay más páginas disponibles
      this.hasNextPage = res.length === 10; // Ajusta 10 al número de noticias por página
    })
  }

  auspicios(){
    this._auspicios.getAllAuspice().subscribe( resp =>{
      this.publi$ = resp

    })
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
