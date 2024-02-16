import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/Interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: [
  ]
})
export class NewsComponent implements OnInit {

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
