import { Component, OnInit } from '@angular/core';
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
import { Select, initTE } from "tw-elements";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styles: [
  ]
})
export class GamesComponent implements OnInit {

  public user!: IUser;
  public esAdministrador: boolean = false;
  userSubscription: Subscription = new Subscription();
  logoutSubscription: Subscription = new Subscription();

  public gameDatos!: IGame[];

  public seleccionados!: MenuCategory;
  public selecGen!: 'Masculino';
  public category!: MenuCategory[];
  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  constructor(
    private _galletita: GalletitaService,
    private _user: UserService,
    private _auth: AuthService,
    private _globalProvider: GlobalProviderService,
    private router: Router,
    private _cat: CategorieService,
    private _game: GameService,
  ) { }

  get haySesion() {
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.buscarSesion();
    initTE({ Select });
    this.Clasificacion('65caba3487fd8b1dcdad802e');
  }

  Clasificacion(idCat: any) {
    this._game.game_GetMatch().subscribe(res =>{
      this.gameDatos = res.filter( game =>{
        return game.category._id === idCat
      })   
    })
  }

  cargarCategory(genero: any) {
    let gen = genero
    // console.log(this.selecGen);

    this._cat.traerCategoria().subscribe((resp: any) => {
      this.nada = resp

      this.category = this.nada.menu_categories.filter(cat => {
        return cat.genero == gen;
      })
      // console.log(this.category, gen);
    })
    const miSelect = document.getElementById('miSelect') as HTMLSelectElement;

    // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    miSelect.removeAttribute('disabled');
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

