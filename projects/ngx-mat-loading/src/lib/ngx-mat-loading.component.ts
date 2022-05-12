import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-mat-loading',
  templateUrl: './ngx-mat-loading.component.html',
  styleUrls: ['./ngx-mat-loading.component.scss'],
  host: {
    '[class]': 'backgroundClass'
  }
})
export class NgxMatLoadingComponent implements OnInit {

  @Input()
  message?: string;

  @Input()
  backgroundClass?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
