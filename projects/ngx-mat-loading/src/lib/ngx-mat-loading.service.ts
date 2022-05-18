import { ComponentRef, Inject, Injectable, OnDestroy, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { NgxMatLoadingComponent, NgxMatLoadingComponentProps } from "./ngx-mat-loading.component";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS, NgxMatLoadingOptions } from "./ngx-mat-loading.model";


@Injectable({
  providedIn: 'root'
})
export class NgxMatLoadingService implements OnDestroy {

  get visible(): boolean {
    return this._visible;
  }
  private _visible: boolean = false;

  /**
   * Loading overlay's component reference
   */
  get componentRef(): ComponentRef<any> | null | undefined {
    return this._componentRef;
  }

  private _overlayRef?: OverlayRef;

  private _componentRef?: ComponentRef<any>;

  private _renderer!: Renderer2;

  constructor(
    private _overlay: Overlay,
    private _rendererFactory: RendererFactory2,
    @Optional() @Inject(NGX_MAT_LOADING_DEFAULT_OPTIONS) private _defaults?: NgxMatLoadingOptions
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy() {
    this.hide();
  }

  /**
   * Show global loading overlay
   * @param props
   * @param options
   */
  show(props?: NgxMatLoadingComponentProps | any, options?: NgxMatLoadingOptions) {
    if (this._visible) {
      return;
    }
    this._visible = true;

    const config = {
      componentType: NgxMatLoadingComponent,
      backdropClass: '',
      panelClass: '',
      ...this._defaults,
      ...options
    };

    this._overlayRef = this._overlay.create({
      scrollStrategy: config.blockScroll ? this._overlay.scrollStrategies.block() : this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      backdropClass: ['ngx-mat-loading-backdrop', config.backdropClass],
      panelClass: ['ngx-mat-loading-panel', config.panelClass],
      hasBackdrop: true
    });

    this._componentRef = this._overlayRef.attach(new ComponentPortal(config.componentType));

    if (config.componentClass) {
      this._renderer.addClass(this._componentRef!.location.nativeElement, config.componentClass);
    }

    if (config.componentStyle) {
      Object.keys(config.componentStyle).forEach(k => {
        this._renderer.setStyle(this._componentRef!.location.nativeElement, k, config.componentStyle![k]);
      });
    }

    this.update({
      ...this._defaults?.componentProps,
      ...options?.componentProps,
      ...props
    });
  }

  /**
   * Update global loading overlay's content component
   * @param props
   */
  update(props?: NgxMatLoadingComponentProps | any) {
    const instance = this._componentRef?.instance;
    if (props && instance) {
      Object.keys(props).forEach(k => instance[k] = props[k]);
    }
  }

  /**
   * Remove global loading overlay
   */
  hide() {
    this._overlayRef?.dispose();
    this._visible = false;
  }

}
