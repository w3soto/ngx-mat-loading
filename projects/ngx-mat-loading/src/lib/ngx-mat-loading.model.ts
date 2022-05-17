import { InjectionToken } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import { NgxMatLoadingComponentProps } from "./ngx-mat-loading.component";


export const NGX_MAT_LOADING_DEFAULT_OPTIONS: InjectionToken<NgxMatLoadingOptions>
  = new InjectionToken('NGX_MAT_LOADING_DEFAULT_OPTIONS');


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
   * Loading's overlay content component properties (inputs).
   */
  componentProps?: NgxMatLoadingComponentProps | any;
}
