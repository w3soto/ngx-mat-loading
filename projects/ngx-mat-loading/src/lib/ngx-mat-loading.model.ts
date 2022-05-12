import { InjectionToken } from "@angular/core";


export const NGX_MAT_LOADING_DEFAULT_OPTIONS: InjectionToken<NgxMatLoadingOptions>
  = new InjectionToken('NGX_MAT_LOADING_DEFAULT_OPTIONS');


export interface NgxMatLoadingOptions {
  backdropClass?: string;
  panelClass?: string;
  message?: string;
  spinner?: boolean;
}
