import { InjectionToken } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";


export const NGX_MAT_LOADING_DEFAULT_OPTIONS: InjectionToken<NgxMatLoadingOptions>
  = new InjectionToken('NGX_MAT_LOADING_DEFAULT_OPTIONS');


export interface NgxMatLoadingOptions {
  backdropClass?: string;
  panelClass?: string;
  component?: ComponentType<any>,
  params?: any
}
