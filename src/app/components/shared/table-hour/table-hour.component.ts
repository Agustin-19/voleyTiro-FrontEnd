import { Component, Input, OnInit } from '@angular/core';
import { IHour } from 'src/app/Interfaces/hour.interface';

@Component({
  selector: 'app-table-hour',
  templateUrl: './table-hour.component.html',
  styles: [
  ]
})
export class TableHourComponent implements OnInit {

  @Input() hour$!: IHour[];

  constructor() { }

  ngOnInit(): void {
  }

}
