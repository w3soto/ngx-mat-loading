import { Component, Input, ViewEncapsulation } from '@angular/core';


export interface NgxMatLoadingComponentProps {
  /**
   * Loading message
   */
  text?: string;

  /**
   * Spinner's or Bar's value. Works only with 'spinner' or 'bar' indicator with 'determinate' mode.
   */
  value?: number;

  /**
   * Spinner's or Bar's mode
   */
  mode?: 'indeterminate' | 'determinate';

  /**
   * Show progress with MatSpinner or MatProgressBar.
   */
  indicator?: 'none' | 'spinner' | 'bar';

  /**
   * Spinner's diameter
   */
  indicatorDiameter?: number;

  /**
   * Spinner's stroke width or Bar width
   */
  indicatorWidth?: number;

  /**
   * Spinner or Bar color
   */
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
export class NgxMatLoadingComponent implements NgxMatLoadingComponentProps {

  @Input()
  indicator: 'none' | 'spinner' | 'bar' = 'none';

  @Input()
  mode: 'indeterminate' | 'determinate' = 'indeterminate';

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
