# NgxMatLoading

Customizable Loading overlay service and directive for Angular Material.

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

## Example

## Services
 
### NgxMatLoading 

#### Properties

| Property | Description |
| :------- | :---------- |
| visible: boolean | |
| componentRef?: ComponentRef<any> | Reference to inner loading component. |

#### Methods

| Method | Description |
| :----- | :---------- |
| show(props?: NgxMatLoadingComponentProps &#124; any): void | Show overlay. |
| update(props?: NgxMatLoadingComponentProps &#124; any): void | Update overlay's component content. |
| hide(): void | Hide overlay.|

## Directives

### NgxMatLoadingDirective 

Selector: **ngxMatLoading**
Exported as: **ngxMatLoading**

#### Properties

| Property | Description |
| :------- | :---------- |
| @Input('ngxMatLoading')<br>show: boolean | |
| @Input('ngxMatLoadingBackdropClass)<br>backdropClass?: string | |
| @Input('ngxMatLoadingPanelClass)<br>panelClass?: string | |
| @Input('ngxMatLoadingComponentType)<br>componentType?: ComponentType<any> | |
| @Input('ngxMatLoadingComponentProps)<br>componentProps?: NgxMatLoadingComponentProps &#124; any | |
| @Input('ngxMatLoadingInnerOverlay)<br>innerOverlay: boolean | Default false.|
| visible: boolean | |
| componentRef?: ComponentRef<any> | Reference to inner loading component. |

| Method | Description |
| :----- | :---------- |
| show(props?: NgxMatLoadingComponentProps &#124; any): void | Show overlay. |
| update(props?: NgxMatLoadingComponentProps &#124; any): void | Update overlay's component content. |
| hide(): void | Hide overlay.|



