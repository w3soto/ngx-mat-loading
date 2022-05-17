import { Component, Input, ViewEncapsulation } from '@angular/core';


export interface NgxMatLoadingComponentProps {
  indicator?: 'none' | 'spinner' | 'bar';
  mode?: 'determinate' | 'indeterminate';
  value?: number;
  text?: string;
  indicatorDiameter?: number;
  indicatorWidth?: number;
  indicatorColor?: string;
}


@Component({
  selector: 'ngx-mat-loading',
  templateUrl: './ngx-mat-loading.component.html',
  styleUrls: ['./ngx-mat-loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ngx-mat-loading'
  }
})
export class NgxMatLoadingComponent {

  @Input()
  indicator: 'none' | 'spinner' | 'bar' = 'spinner';

  @Input()
  mode: 'determinate' | 'indeterminate' = 'indeterminate';

  @Input()
  value: number = 0;

  @Input()
  text?: string;

  @Input()
  indicatorDiameter: number = 32;

  @Input()
  indicatorWidth: number = 4;

  @Input()
  indicatorColor: string = 'primary';

}
