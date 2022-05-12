import { ComponentRef, Inject, Injectable, Optional } from '@angular/core';
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { NgxMatLoadingComponent } from "./ngx-mat-loading.component";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS, NgxMatLoadingOptions } from "./ngx-mat-loading.model";


@Injectable({
  providedIn: 'root'
})
export class NgxMatLoadingService {

  get isVisible(): boolean {
    return this._isVisible;
  }
  private _isVisible: boolean = false;

  /**
   * Overlay's component reference
   */
  get componentRef(): ComponentRef<any> | null | undefined {
    return this._componentRef;
  }

  private _overlayRef?: OverlayRef;

  private _componentRef?: ComponentRef<any>;

  constructor(
    private _overlay: Overlay,
    @Optional() @Inject(NGX_MAT_LOADING_DEFAULT_OPTIONS) private _defaults?: NgxMatLoadingOptions
  ) {
  }

  showLoading(options?: NgxMatLoadingOptions) {
    if (this._isVisible) {
      return;
    }
    this._isVisible = true;

    const opts = {
      ...this._defaults,
      ...options
    };

    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      backdropClass: ['ngx-mat-loading-backdrop', opts?.backdropClass || 'cdk-overlay-dark-backdrop'],
      panelClass: ['ngx-mat-loading-panel', opts?.panelClass || ''],
      hasBackdrop: true
    });

    this._componentRef = this._overlayRef.attach(new ComponentPortal(opts.component || NgxMatLoadingComponent));

    if (opts.params) {
      const instance = this._componentRef.instance;
      Object.keys(opts.params).forEach(k => {
        instance[k] = opts.params[k];
      })
    }
  }

  hideLoading() {
    this._overlayRef?.dispose();
    this._isVisible = false;
  }

}
