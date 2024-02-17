import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuspice } from 'src/app/Interfaces/auspice.interface';
import { AuspiceService } from 'src/app/services/auspice.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicity-admin',
  templateUrl: './publicity-admin.component.html',
  styles: [
  ]
})
export class PublicityAdminComponent implements OnInit {


  public publi: IAuspice ={
    _id: '',
    titulo:'',
    img_url:'',
  }


  constructor(
    private _storageService: StorageService,
    private _auspice: AuspiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Image($event: any){
    const file = $event.target.files;
    let reader = new FileReader();
    let nombre = 'fecha_';

    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      // console.log(reader.result);
      this._storageService.imgPublicidad(nombre + '.' + Date.now(), reader.result)
        .then(urlImagen => {
          // console.log(urlImagen);
          this.publi.img_url = urlImagen;
        });
    }
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
    this.RegistrarAuspicio(this.publi)
  }

  RegistrarAuspicio(publi: any) {
    this._auspice.createAuspice(publi).subscribe(res => {
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
          this.router.navigateByUrl('/home/news');
        }
      });
    }, error => {
      console.log(error);

    })
  }



}
