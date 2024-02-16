import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from 'src/app/Interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styles: [
  ]
})
export class ViewNewsComponent implements OnInit {

  
  public news$!: INews;
  public notiId = '';

  public obtenerParrafos(contenido: string): string[] {
    return contenido.split('\n\n'); // Suponemos que los párrafos están separados por dos saltos de línea
  }

  constructor( 
    private _rutaActiva: ActivatedRoute,
    private _noti: NewsService,
  ) { 
    this.notiId = this._rutaActiva.snapshot.params['newsId']
  }

  ngOnInit(): void {
    this._noti.getNewsId(this.notiId).subscribe(res =>{
      this.news$ = res
      // console.log(this.news$);

      const fechaFormateada = new Date(this.news$.fechaPublicacion).toLocaleDateString().split('T')[0];
      this.news$.fechaPublicacion = fechaFormateada;
      
    })
  }


}
