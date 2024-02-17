import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MenuCategory, ICategory } from 'src/app/Interfaces/categorie.interface';
import { IClub } from 'src/app/Interfaces/club.interface';
import { Localidad } from 'src/app/Interfaces/localities.interface';
import { IUser } from 'src/app/Interfaces/user.interface';
import { CategorieService } from 'src/app/services/categorie.service';
import { ClubService } from 'src/app/services/club.service';
import { GlobalProviderService } from 'src/app/services/globlal-provider.service';
import { LocalitiesService } from 'src/app/services/localities.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';
import { Select, initTE } from "tw-elements";

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.component.html',
  styles: [
  ]
})
export class ClubAdminComponent implements OnInit {

  @Input() clubData!: IClub;
  @ViewChild('ClubImangenRef') inputClubRef: ElementRef | undefined;

  public localidades!: Localidad;
  public localidad = '';
  public provincia = '';
  public direccion = '';
  public direccionCompleta = [{
    direccion: '',
    localidad: '',
    provincia: '',
  }];

  public club$!: Observable<IClub[]>;
  public club: IClub = {
    nombre: '',
    sede: this.direccionCompleta,
    colores: [], // Array de cadenas (puedes marcarlo como opcional)
    jugadores: [], // Array de cualquier tipo (puedes marcarlo como opcional)
    categorias: [],
    perfil_imagen_nombreArchivo: '',
    perfil_imagen_url: '',
  };



  public usuario!: IUser;
  public categoriaFem: MenuCategory[] = [];
  public seleccionados: MenuCategory[] = [];
  public colores: [] = [];

  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  private idClub!: string;
  private parametroClubId!: string | undefined;
  private clubFile!: File;
  private clubFileName!: string;
  private clubFilePath!: string;
  private yaGuarde: boolean = false;


  isLoading: boolean = true;
  productoAModificar: boolean = false;
  productoSubscripcion!: Subscription;

  constructor(
    private _globalProvider: GlobalProviderService,
    private _club: ClubService,
    private _categorie: CategorieService,
    private _localities: LocalitiesService,
    private _rutaActiva: ActivatedRoute,
    private router: Router,
    private _storageService: StorageService,
  ) {
    this.idClub = this._rutaActiva.snapshot.params['clubId'];
  }

  ngOnInit(): void {
    initTE({ Select });
    this.traerCategorias();

    if (this.idClub?.length >= 4) {
      this.traerClub();
    }
  }

  
  uploadImage($event: any) {
    const file = $event.target.files;
    let reader = new FileReader();
    let nombre = 'club.'+this.club.nombre;

    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      // console.log(reader.result);
      this._storageService.subirEscudo(nombre + '.' + Date.now(), reader.result)
        .then(urlImagen => {
          // console.log(urlImagen);
          this.club.perfil_imagen_url = urlImagen;
        });
    }

  }



  traerCategorias() {
    this._categorie.traerCategoria().subscribe((resp: any) => {
      this.nada = resp
      this.categoriaFem = this.nada.menu_categories


      this.categoriaFem.sort(this.compararPorGenero);

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


  traerClub() {
    this._club.getClubId(this.idClub).subscribe(resp => {
      this.club = resp
      // console.log(resp);
      this.parametroClubId = resp['_id'];

      this.provincia = this.club.sede[0].provincia;
      this.localidad = this.club.sede[0].localidad;
      this.direccion = this.club.sede[0].direccion;
      this.enviarCategoria(this.club.categorias);
      this.elegirColores(this.club.colores);
      this.colores = this.club.colores;

    })
  }

  emitClubData($event: any) {
    this._globalProvider.enviarDatosClub(this.club);
  }

  enviarFormulario(formulario: NgForm) {

    Swal.fire({
      title: 'Registrando Club',
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
        this.club.sede = this.direccionCompleta;
        this.club.categorias = this.seleccionados;
        this.club.colores = this.colores;

        if (this.parametroClubId && this.parametroClubId.length >= 4) {
          this.actualizarClub(this.club)
        } else {
          this.RegistrarClub(this.club)
        }
        // console.log(this.club);

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

  RegistrarClub(club: any) {
    this._club.createClub(club).subscribe(res => {
      Swal.fire({
        title: 'Correcto',
        text: 'Club registrado correctamente',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Hecho',
        confirmButtonColor: '#3085d6'
      }).then(result => {
        if (result.value) {
          this.router.navigateByUrl('/home/clubs');
        }
      });
    }, error => {
      console.log(error);

    })
  }


  actualizarClub(club: any) {
    this._club.updateUserById(this.parametroClubId, club).subscribe(res => {
      Swal.fire({
        title: 'Correcto',
        text: 'Club actualizado correctamente',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Hecho',
        confirmButtonColor: '#3085d6'
      }).then(result => {
        if (result.value) {
          this.router.navigateByUrl('/home/clubs');
        }
      });
    }, error => {
      console.log(error);

    })
  }

  enviarCategoria(respuesta: any) {
    this.seleccionados = respuesta;
    // console.log(this.seleccionados);
  }

  elegirColores(color: any) {
    this.colores = color;
    // console.log(this.colores);    
  }



}
