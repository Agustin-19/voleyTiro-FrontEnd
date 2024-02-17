import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuspice } from 'src/app/Interfaces/auspice.interface';

@Component({
  selector: 'app-auspice-card',
  templateUrl: './auspice-card.component.html',
  styles: [
  ]
})
export class AuspiceCardComponent implements OnInit {

  @Input() publi$!: IAuspice[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verNoticia(index: any){
    this.router.navigate(['/admin/publicity/', index])
  }

}
