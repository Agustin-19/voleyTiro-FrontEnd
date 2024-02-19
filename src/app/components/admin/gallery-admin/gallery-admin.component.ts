import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IGallery } from 'src/app/Interfaces/gallery.interface';
import { GalleryService } from 'src/app/services/gallery.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gallery-admin',
  templateUrl: './gallery-admin.component.html',
  styles: [
  ]
})
export class GalleryAdminComponent implements OnInit {

  public gallery: IGallery ={
    _id: '',
    images: [],
    title: '',
  }
  public imagenes: [string] = [''];

  constructor(
    private _storageService: StorageService,
    private _gallery: GalleryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Image($event: any) {
    const files = $event.target.files;
    const nombre = this.gallery.title;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageDataURL = reader.result as string; // Obtener el URL de la imagen en formato base64
  
        this._storageService.imgGaleria(nombre + '_' + Date.now(), imageDataURL)
          .then(urlImagen => {
            if (urlImagen !== null) { // Verificar si la URL no es null
              this.imagenes.push(urlImagen); // Agregar la URL al arreglo de imágenes
              // console.log('Imagen subida:', urlImagen);
            }
          })
          .catch(error => {
            console.error('Error al subir imagen:', error);
          });
      };
  
      reader.onerror = () => {
        console.error('Error al leer el archivo');
      };
  
      reader.readAsDataURL(file);
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
    this.gallery.images = this.imagenes
    this.SubirGaleria(this.gallery)
  }

  SubirGaleria(gallery: any) {
    this._gallery.createGallery(gallery).subscribe(res => {
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
          // this.router.navigateByUrl('/home');
        }
      });
    }, error => {
      console.log(error);

    })
  }

}
