import { Component, OnInit } from '@angular/core';
import { IAuspice } from 'src/app/Interfaces/auspice.interface';
import { INews } from 'src/app/Interfaces/news.interface';
import { AuspiceService } from 'src/app/services/auspice.service';
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

  constructor(
    private _notiService: NewsService,
    private _auspicios: AuspiceService,
  ) { }

  ngOnInit(): void {
    this.traerNoticias();
    this.auspicios();
  }

  traerNoticias() {
    this._notiService.getAllNews().subscribe(res => {
      this.news$ = res
    })
  }

  auspicios(){
    this._auspicios.getAllAuspice().subscribe( resp =>{
      this.publi$ = resp

    })
  }

}
