import {
  ComponentRef,
  Directive,
  ElementRef, Inject,
  Input,
  isDevMode,
  OnDestroy, Optional,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { ComponentPortal } from "@angular/cdk/portal";
import { OverlayRef, } from "@angular/cdk/overlay";

import { NgxMatLoadingComponent } from "./ngx-mat-loading.component";
import { NgxMatLoadingElementOverlay } from "./ngx-mat-loading-element-overlay.service";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS, NgxMatLoadingOptions } from "./ngx-mat-loading.model";


@Directive({
  selector: '[ngxMatLoading]',
  exportAs: 'ngxMatLoading'
})
export class NgxMatLoadingDirective implements OnDestroy   {

  @Input('ngxMatLoading')
  set show(show: BooleanInput) {
    coerceBooleanProperty(show) ? this.showLoading() : this.hideLoading();
  }

  @Input('ngxMatLoadingOptions')
  options?: NgxMatLoadingOptions;


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

  private _elementPosition?: string | null;

  constructor(
    private _elementRef: ElementRef,
    private _overlay: NgxMatLoadingElementOverlay,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Optional() @Inject(NGX_MAT_LOADING_DEFAULT_OPTIONS) private _defaults?: NgxMatLoadingOptions,
  ) { }

  ngOnDestroy() {
    this.hideLoading();
  }

  showLoading(options?: NgxMatLoadingOptions) {
    if (this._isVisible) {
      return;
    }
    this._isVisible = true;

    // fix position
    this._setHostElementPosition();

    const opts = {
      ...this._defaults,
      ...this.options,
      ...options
    };

    // add overlay
    this._overlayRef = this._overlay.createFor(this._elementRef, {
      positionStrategy: this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
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
    this._restoreHostElementPosition();
    this._isVisible = false;
  }

  _setHostElementPosition() {
    this._elementPosition = null;

    const style = this._document.defaultView?.getComputedStyle(this._elementRef.nativeElement);

    if (style && ['absolute', 'relative', 'sticky'].indexOf(style.position) == -1) {
      this._elementPosition = style.position;
      if (isDevMode()) {
        console.warn('[NgxMatLoading]',
          'Element must have CSS position set to [relative], [absolute] or [sticky] (current value is [' + style.position + ']).')
      }
      this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
    }
  }

  _restoreHostElementPosition() {
    if (this._elementPosition) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'position',
        this._elementPosition != 'static' ? this._elementPosition : null);
    }
  }

}
