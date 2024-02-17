import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Tooltip, initTE } from 'tw-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'voleyTiro';

  ngOnInit(): void {
    initFlowbite();
    initTE({ Tooltip });
  }
}
