import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'ngx-mat-loading',
  templateUrl: './ngx-mat-loading.component.html',
  styleUrls: ['./ngx-mat-loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ngx-mat-loading'
  }
})
export class NgxMatLoadingComponent implements OnInit {

  @Input()
  message?: string;

  @Input()
  diameter: number = 24;

  @Input()
  strokeWidth: number = 2;

  @Input()
  spinner: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
