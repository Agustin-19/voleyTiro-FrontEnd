import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuCategory, ICategory } from 'src/app/Interfaces/categorie.interface';
import { IClub } from 'src/app/Interfaces/club.interface';
import { Localidad } from 'src/app/Interfaces/localities.interface';
import { IPlayer } from 'src/app/Interfaces/player.interface';
import { CategorieService } from 'src/app/services/categorie.service';
import { ClubService } from 'src/app/services/club.service';
import { LocalitiesService } from 'src/app/services/localities.service';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players-admin',
  templateUrl: './players-admin.component.html',
  styles: [
  ]
})
export class PlayersAdminComponent implements OnInit {

  public categoriaParent = [];
  public categoriaGen!: MenuCategory;
  public seleccionados!: any;
  public selecGen!: 'Masculino';
  public category!: MenuCategory[];
  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  

 

  public localidades!: Localidad;
  public localidad = '';
  public provincia = '';
  public direccion = 'calle';
  public direccionCompleta = [{
    direccion: '',
    localidad: '',
    provincia: '',
  }];
  
    public player: IPlayer = {
      // Si el modelo tiene un campo de identificación (usualmente _id en MongoDB)
      nombre: '',
      apellido: '',
      genero: '',
      direccion: this.direccionCompleta,
      fecha_nacimiento: '',
      habilitado: true,
      category: this.seleccionados,
      dni: '',
    };

    private parametroPlayer: string;

  constructor(
    private _categorie: CategorieService,
    private _localities: LocalitiesService,
    private _player: PlayerService,
    private router: Router,
    private _club: ClubService,
    private _rutaActiva: ActivatedRoute,
  ) {
    this.parametroPlayer = this._rutaActiva.snapshot.params['playerId']
  }
  @Input() sticky: boolean = false;

  ngOnInit(): void {

    if (this.parametroPlayer && this.parametroPlayer.length >= 5) {
      this._player.getPlayerId(this.parametroPlayer).subscribe((resp) => {
        this.player = resp
      console.log(this.player);

      this.cargarCategoria(this.player.genero);
      this.localidad = this.player.direccion[0].localidad;
      this.provincia = this.player.direccion[0].provincia;
      this.seleccionados = this.player.category._id;
      this.traerClubs(this.player.category._id);
      // console.log(this.clubSeclect);
      
      
      })
    }

  }

  cargarCategoria(genero: any){
    let gen = genero
    // console.log(this.selecGen);
     // Obtén una referencia al elemento select
    const selectCat = document.getElementById('selectCat') as HTMLSelectElement;

     // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    selectCat.removeAttribute('disabled');
    
    this._categorie.traerCategoria().subscribe((resp: any) => {
      this.nada = resp  

      this.category = this.nada.menu_categories.filter(cat =>{
        return cat.genero == gen;
      })
      // console.log(this.category, gen);
    })
  }

  traerClubs(IdCat: any) {

    this.enviarCategoria(IdCat);
    // console.log(IdCat);
  }

  enviarCategoria(parent: any){
    this.seleccionados = parent;
    // console.log('selecion: '+this.seleccionados);
  }


  enviarFormulario (formulario: NgForm) {

    Swal.fire({
      title: 'Registrando Jugador',
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

    
    //comprovacion de localidades. comprueba si existe la localidad elegida
    this._localities.traer_localidad(this.localidad, this.provincia).subscribe(resp => {
      this.localidades = resp;
      // si hay solo una localidad con ese nombre significa que fue encontrada y se pasa a llenar los datos y a registrar el usuario
      if (this.localidades.cantidad == 1) {
        const localidadAPI = this.localidades.localidades[0].localidad_censal_nombre;
        const provinciaAPI = this.localidades.localidades[0].provincia_nombre;
        this.direccionCompleta = [{
          provincia: provinciaAPI,
          localidad: localidadAPI,
          direccion: this.direccion,
        }];


        // console.log(this.direccionCompleta);
        this.player.direccion = this.direccionCompleta;
        this.player.category = this.seleccionados;
        
        // this.player.genero = this.selecGen;
        // console.log(this.player);
        
        this.RegistrarJugador(this.player)
      } else {
        // si hay muchas localidades que coinciden se lanza una alerta y se pide al usuario que sea mas especifico
        // proximamente... trabajar para dar una eleccion si hay dos localidades o provincias con el mismo nombre
        if (this.localidades.cantidad >= 2) {
          Swal.fire({
            title: 'Error',
            text: 'Hay mas de una localidad con el mismo nombre, a la hora de editar su perfil puede completar con esta localidad',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar'
          })
          // crear unpopup para que elija una localidad
          // si se cumple esto retorna al formulario 
          return;
        } else {

          // si no ocurre lo esperado es porque no se encontraron localidades, por lo tanto se muestra una alerta advirtiendo lo sucedido 
          Swal.fire({
            title: 'Error',
            text: 'Localidad incorrecta, por favor verifique los datos',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar'
          })
          return;
        }
      }
      // this.router.navigate(['/clubs/forms']);
    });
  }

  RegistrarJugador(jugador: any){

    if (this.parametroPlayer && this.parametroPlayer.length >= 4) {
      this._player.updateplayerById(this.parametroPlayer, jugador).subscribe(res => {
        Swal.fire({
          title: 'Correcto',
          text: 'Jugador actualizado correctamente',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          confirmButtonText: 'Hecho',
          confirmButtonColor: '#3085d6'
        }).then(result => {
          if (result.value) {
            this.router.navigateByUrl('/home/players');
          }
        });
      })
    }else{
      this._player.createPlayer(jugador).subscribe(res => {
        Swal.fire({
          title: 'Correcto',
          text: 'Jugador registrado correctamente',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          confirmButtonText: 'Hecho',
          confirmButtonColor: '#3085d6'
        }).then(result => {
          if (result.value) {
            this.router.navigateByUrl('/home/players');
          }
        });
      }, error => {
        console.log(error);

      })
    }
  }

}
