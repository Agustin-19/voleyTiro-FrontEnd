import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IAuspice } from 'src/app/Interfaces/auspice.interface';
import { IHour } from 'src/app/Interfaces/hour.interface';
import { INews } from 'src/app/Interfaces/news.interface';
import { AuspiceService } from 'src/app/services/auspice.service';
import { HourService } from 'src/app/services/hour.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styles: [
  ]
})
export class StartComponent implements OnInit {

  public news$!: INews[];
  public publi$!: IAuspice[];
  public hour$!: IHour[];

  constructor(
    private _notiService: NewsService,
    private _auspicios: AuspiceService,
    private _hour: HourService,
  ) { }

  ngOnInit(): void {
    this.traerNoticias();
    this.auspicios();
    this.cargarHorarios();
  }

  traerNoticias() {
    this._notiService.getAllNews().pipe( 
      take(2)  //limita la respuesta segun el numero (2) 
    ).subscribe(res => {
      this.news$ = res
    })
  }

  auspicios(){
    this._auspicios.getAllAuspice().subscribe( resp =>{
      this.publi$ = resp

    })
  }

  cargarHorarios(){
    this._hour.getAllHour().subscribe(resp =>{
      resp.sort((a, b) => {
        if (a.hora < b.hora) {
          return -1;
        }
        if (a.hora > b.hora) {
          return 1;
        }
        return 0;
      });
      this.hour$ = resp
      // console.log(this.hour$);
      
    })
  }

}
