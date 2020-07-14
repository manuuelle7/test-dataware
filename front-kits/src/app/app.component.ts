import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <ng-progress
                [min]="10"
                [max]="100"
                [speed]="200"
                [spinner]="'true'"
                [spinnerPosition] ="'right'"
                [direction]="'ltr+'"
                [trickleSpeed]="250"
                [thick]="'true'"
                [ease]="'linear'"
                [color]="'#00e2ff'"
                 [fixed]="'true'"

                 ></ng-progress>
    <router-outlet></router-outlet>
  `
})
export class AppComponent  implements OnInit{

  constructor( ) {
  }

  ngOnInit(): void {
    console.log('Con esto nos vamos');
  }
}
