import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/Interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styles: [
  ]
})
export class StartComponent implements OnInit {

  public news$!: INews[];

  constructor(
    private _notiService: NewsService,
  ) { }

  ngOnInit(): void {
    this.traerNoticias();
  }

  traerNoticias() {
    this._notiService.getAllNews().subscribe(res => {
      this.news$ = res
    })
  }

}
