import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INews } from 'src/app/Interfaces/news.interface';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styles: [
  ]
})
export class CardNewsComponent implements OnInit {

  @Input() new$!: INews[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verNoticia(index: any){
    this.router.navigate(['/home/news/view/', index])
  }
}
