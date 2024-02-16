import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { INews } from 'src/app/Interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styles: [
  ]
})
export class NewsAdminComponent implements OnInit {

  public news: INews = {
    titulo: '',
    contenido: '',
    fechaPublicacion:'',
  };

  constructor(
    private _storageService: StorageService,
    private _notiService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  bannerImage($event: any){
    const file = $event.target.files;
    let reader = new FileReader();
    let nombre = 'fecha_';

    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      // console.log(reader.result);
      this._storageService.subirImagenNoticia(nombre + '.' + Date.now(), reader.result)
        .then(urlImagen => {
          // console.log(urlImagen);
          this.news.banner_url = urlImagen;
        });
    }
  }

  imageSecundaria($event: any){
    const file = $event.target.files;
    let reader = new FileReader();
    let nombre = 'fecha_';

    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      console.log(reader.result);
      this._storageService.subirImagenNoticia(nombre + '.' + Date.now(), reader.result)
        .then(urlImagen => {
          console.log(urlImagen);
          this.news.img_url = urlImagen;
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
    this.news.fechaPublicacion = Date()
    this.RegistrarClub(this.news)
  }

  RegistrarClub(news: any) {
    this._notiService.createNews(news).subscribe(res => {
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
