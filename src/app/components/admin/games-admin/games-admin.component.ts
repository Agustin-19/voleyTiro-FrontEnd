import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuCategory, ICategory } from 'src/app/Interfaces/categorie.interface';
import { IClub } from 'src/app/Interfaces/club.interface';
import { IGame } from 'src/app/Interfaces/game.interface';
import { CategorieService } from 'src/app/services/categorie.service';
import { ClubService } from 'src/app/services/club.service';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-games-admin',
  templateUrl: './games-admin.component.html',
  styles: [
  ]
})
export class GamesAdminComponent implements OnInit {

  public seleccionados!: any;
  public selecGen!: string;
  public category!: MenuCategory[];
  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  public club$!: IClub[];
  public clubs!: IClub[];
  public clubLocal!: IClub;
  public setsLocGan = 0;
  public clubVisit!: IClub;
  public setsVisGan = 0;


  public game$!: IGame[];

  public game: IGame = {
    fecha: '', // Puedes marcarlo como opcional si no es requerido
    category: this.seleccionados, // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    club_loc: this.clubLocal, // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    sets_won_loc: 0,
    result_loc: [0], // Array de números (puedes marcarlo como opcional)
    club_vis: this.clubVisit, // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    set_won_vis: 0,
    result_vis: [0], // Array de números (puedes marcarlo como opcional)
    resultado: '0-0'
  };

  private parametroGame: string = '';

  constructor(
    private _categorie: CategorieService,
    private _club: ClubService,
    private _game: GameService,
    private router: Router,
    private _rutaActiva: ActivatedRoute,
  ) {
    this.parametroGame = this._rutaActiva.snapshot.params['partidoId']
  }

  ngOnInit(): void {

    if (this.parametroGame?.length >= 5) {
      this._game.game_GetId(this.parametroGame).subscribe((resp: any) => {
        this.game = resp
        // console.log(this.game);
        
        const fechaFormateada = new Date(this.game.fecha).toISOString().split('T')[0];
        this.game.fecha = fechaFormateada;

        this.selecGen = this.game.category.genero;
        this.cargarCategory(this.selecGen);
        this.seleccionados = this.game.category._id;
        this.enviarCategoria(this.seleccionados);
        this.selecClubLocal(this.game.club_loc._id);
        this.selecClubVisitante(this.game.club_vis._id);
        this.setsLocGan = this.game.sets_won_loc;
        this.setsVisGan = this.game.set_won_vis;
        // console.log(this.setsLocGan, this.setsVisGan);
        
        
      })
    }
  }



  cargarCategory(genero: any) {
    let gen = genero
    // console.log(this.selecGen);

    this._categorie.traerCategoria().subscribe((resp: any) => {
      this.nada = resp

      this.category = this.nada.menu_categories.filter(cat => {
        return cat.genero == gen;
      })
      // console.log(this.category, gen);
    })
    // Obtén una referencia al elemento select
    const selectCat = document.getElementById('selectCat') as HTMLSelectElement;

    // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    selectCat.removeAttribute('disabled');
  }

  enviarCategoria(parent: any) {
    this.seleccionados = parent;
    // console.log('selecion: '+this.seleccionados);

    this.traerClubs(this.seleccionados);
    // Obtén una referencia al elemento select
    const miSelect = document.getElementById('miSelect') as HTMLSelectElement;

    // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    miSelect.removeAttribute('disabled');

    const selectVis = document.getElementById('selectVis') as HTMLSelectElement;

    // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    selectVis.removeAttribute('disabled');

  }

  traerClubs(IdCat: any) {
    // console.log(IdCat);

    this._club.getAllClub().subscribe((resp: any) => {
      this.clubs = resp
      // Filtrar los clubes que coinciden con IdCat
      this.club$ = this.clubs.filter(clubIterado => {
        return clubIterado.categorias.some(categoria=> categoria['_id'].includes(IdCat))
      }
      );
      // Imprimir los clubes encontrados (esto muestra todos los clubes que coinciden)
      // console.log(this.club$);

    });

  }
  selecClubLocal(idClub: any) {
    this.clubLocal = idClub;
    // console.log(this.clubLocal);
  }

  selecClubVisitante(idClub: any) {
    this.clubVisit = idClub;
    // console.log(this.clubVisit);
  }

  enviarFormulario(formulario: NgForm) {
    Swal.fire({
      title: 'Registrando Datos',
      text: 'Enviando información...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    })

    if (formulario.invalid) {
      Swal.fire({
        icon: 'warning',
        title: '¡Alerta!',
        text: 'Debe completar los datos requeridos para continuar',
        confirmButtonText: 'Aceptar'
      });
      return
    };

    this.game.category = this.seleccionados;
    this.game.club_loc = this.clubLocal;
    this.game.club_vis = this.clubVisit;
    this.game.resultado = '' + this.game.sets_won_loc + '-' + this.game.set_won_vis + '';

    // console.log(this.game);
    this.RegistrarPartido(this.game);
  }

  RegistrarPartido(datos: any) {

    if (this.parametroGame && this.parametroGame.length >= 4) {
      this._game.game_UpdateMatch(this.parametroGame, datos).subscribe(res => {
        Swal.fire({
          title: 'Correcto',
          text: 'Datos actualizados correctamente',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          confirmButtonText: 'Hecho',
          confirmButtonColor: '#3085d6'
        }).then(result => {
          if (result.value) {
            this.router.navigateByUrl('/admin/game');
          }
        });
      })
    }else{
      
      this._game.game_SaveMatch(datos).subscribe(res => {
        Swal.fire({
          title: 'Correcto',
          text: 'Datos registrados correctamente',
          icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Hecho',
        confirmButtonColor: '#3085d6'
      }).then(result => {
        if (result.value) {
          this.router.navigateByUrl('/admin/game');
        }
      });
    }, error => {
      console.log("Error al guardar",error);
      
    })
  }
}

}
