# NgxMatLoading

Customizable Loading overlay service and directive for Angular Material.

[StackBlitz Demo](https://stackblitz.com/edit/angular-ivy-zbwy3g)

## Features
* Global or Element/Component overlay
* Custom inner component

## TODO
* Tests
* Documentation 

## Installation
```shell
npm -i ngx-mat-loading
```

Update *angular.json*
```json
  "styles": [
    "node_modules/ngx-mat-loading/ngx-mat-loading.css",
    "src/styles.scss"
  ]
```

Import and configure
```typescript
import { NgxMatLoadingModule, NGX_MAT_LOADING_DEFAULT_OPTIONS } from "ngx-mat-loading";

@NgModule({
  ...,
  imports: [
    NgxMatLoadingModule
  ],
  providers: [
    {
      provide: NGX_MAT_LOADING_DEFAULT_OPTIONS, 
      useValue: {
        backdropClass: 'ngx-mat-loading-dark-backdrop',
        innerOverlay: true,
        componentClass: 'my-loading-component', 
        componentProps: { indicator: 'bar', text: 'LOADING...' }
      }
    }
  ],
  ...
})
```

## Example

#### Global loading
```typescript
import { Component } from "@angular/core";
import { concatMap, delay, finalize, tap } from "rxjs/operators";
import { NgxMatLoadingService } from "ngx-mat-loading";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
      private _loading: NgxMatLoadingService
  ) {}
  
  showLoading() {
    this._loading.show({
      mode: "determinate",
      text: 'Starting...'
    }, {
      componentStyle: {
        'width': '150px'
      }
    });
    of(0, 3, 15, 34, 62, 63, 64, 65, 99, 100).pipe(
      concatMap(x => of(x).pipe(delay(500))),
      tap(v => this._loading.update({ value: v, text: `Processing ${v}%...` })),
      finalize(() => this._loading.hide())
    ).subscribe();
  }
}
```

#### Element/Component loading
```typescript
export class MyComponent {
  loading: boolean = false;
}
```
```html
<div
  class="my-div"
  [ngxMatLoading]="loading"
  ngxMatLoadingBackdropClass="ngx-mat-loading-light-backdrop"
  ngxMatLoadingInnerOverlay>
  
  content
  
</div>

<button (click)="loading = !loading">Toggle loading</button>
```

## Services
 
### NgxMatLoadingService 

#### Properties

| Property | Description |
| :------- | :---------- |
| visible: boolean | |
| componentRef?: ComponentRef&lt;any&gt;  | Reference to inner loading component. |

#### Methods

| Method | Description |
| :----- | :---------- |
| show(props?: NgxMatLoadingComponentProps &#124; any, options?: NgxMatLoadingOptions): void | Show overlay. |
| update(props?: NgxMatLoadingComponentProps &#124; any): void | Update overlay's component content. |
| hide(): void | Hide overlay.|

## Directives

### NgxMatLoadingDirective 

Selector: **ngxMatLoading**<br>
Exported as: **ngxMatLoading**

#### Properties

| Property | Description |
| :------- | :---------- |
| @Input('ngxMatLoading')<br>show: boolean | |
| @Input('ngxMatLoadingBackdropClass')<br>backdropClass?: string | |
| @Input('ngxMatLoadingPanelClass')<br>panelClass?: string | |
| @Input('ngxMatLoadingInnerOverlay')<br>innerOverlay: boolean | Default false.|
| @Input('ngxMatLoadingComponentType')<br>componentType?: ComponentType&lt;any&gt;  | |
| @Input('ngxMatLoadingComponentProps')<br>componentProps?: NgxMatLoadingComponentProps &#124; any | |
| @Input('ngxMatLoadingComponentClass')<br>componentClass?: string | |
| @Input('ngxMatLoadingComponentStyle')<br>componentStyle?: {[key:string]: string} | |
| visible: boolean | |
| componentRef?: ComponentRef&lt;any&gt; | Reference to inner loading component. |

#### Methods

| Method | Description |
| :----- | :---------- |
| show(props?: NgxMatLoadingComponentProps &#124; any): void | Show overlay. |
| update(props?: NgxMatLoadingComponentProps &#124; any): void | Update overlay's component content. |
| hide(): void | Hide overlay.|


## Interfaces

### NgxMatLoadingComponentProps
```typescript
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
```

### NgxMatLoadingOptions
```typescript
export interface NgxMatLoadingOptions {
  /**
   * Loading's overlay backdrop class
   */
  backdropClass?: string;

  /**
   * Loading's overlay content panel class
   */
  panelClass?: string;

  /**
   * Whether overlay is inside covered element or in global overlay container. Works only with NgxMatLoading directive.
   * Default false.
   */
  innerOverlay?: boolean;

  /**
   * Whether loading overlay will block global scroll. Works only with NgxMatLoading service. Default is false.
   */
  blockScroll?: boolean,

  /**
   * Loading's overlay content component. Default NgxMatLoadingComponent.
   */
  componentType?: ComponentType<any>;

  /**
   * Loading's overlay content component's CSS class.
   */
  componentClass?: string;

  /**
   * Loading's overlay content component's CSS style.
   */
  componentStyle?: {[key: string]: string};

  /**
   * Loading's overlay content component properties (inputs).
   */
  componentProps?: NgxMatLoadingComponentProps | any;
}
```
