import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuCategory, ICategory } from 'src/app/Interfaces/categorie.interface';
import { IPlayer } from 'src/app/Interfaces/player.interface';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { PlayerService } from 'src/app/services/player.service';
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

  public player$!: IPlayer[];
  public playerFiltrado!: IPlayer[];

  public categoria: MenuCategory[] | undefined;
  public categoriaSelect!: MenuCategory;
  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  constructor(
    private _galletita: GalletitaService,
    private _user: UserService,
    private _player: PlayerService,
    private _cat: CategorieService,
    private _auth: AuthService,
    private _globalProvider: GlobalProviderService,
    private router: Router,
  ) { }

  get haySesion() {
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.buscarSesion();
    this.traerjugadores();
    this.cargarCategorias();
  }
  
  cargarCategorias() {
    this._cat.traerCategoria().subscribe((resp: any) =>{
      this.nada = resp
      this.categoria = this.nada.menu_categories

      this.categoria.sort(this.compararPorGenero);
      // console.log(this.categoria);
      
    })
  }

  compararPorGenero(a: any, b: any): number {
    const generoA = a.genero.toLowerCase();
    const generoB = b.genero.toLowerCase();

    if (generoA < generoB) {
        return -1;
    } else if (generoA > generoB) {
        return 1;
    } else {
        return 0;
    }
}


  traerjugadores() {
    this._player.getAllPlayers().subscribe(resp => {
      this.player$ = resp
      this.playerFiltrado = this.player$;
      // console.log(this.player$);
      
    })
    
  }

  cambioCat(){
    this.playerFiltrado = this.player$.filter(filtro => 
    (!this.categoriaSelect || filtro.category._id === this.categoriaSelect._id)

    );
     // Si no hay jugadores, asigna un array vacío
    if (!this.playerFiltrado) {
      this.playerFiltrado = [];
    }
    // console.log(this.playerFiltrado);
    
  }



  
  buscarSesion(){
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
