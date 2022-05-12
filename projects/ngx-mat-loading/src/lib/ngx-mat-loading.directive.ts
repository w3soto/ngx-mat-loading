import {
  ComponentRef,
  Directive,
  ElementRef, Inject,
  Input,
  isDevMode,
  OnDestroy, Optional,
  Renderer2
} from '@angular/core';
import { BooleanInput } from "@angular/cdk/coercion";
import { ComponentPortal } from "@angular/cdk/portal";
import { OverlayRef, } from "@angular/cdk/overlay";
import { Subject } from "rxjs";

import { NgxMatLoadingComponent } from "./ngx-mat-loading.component";
import { NgxMatLoadingElementOverlay } from "./ngx-mat-loading-element-overlay.service";
import { DOCUMENT } from "@angular/common";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS, NgxMatLoadingOptions } from "./ngx-mat-loading.model";


@Directive({
  selector: '[ngxMatLoading]',
  exportAs: 'ngxMatLoading'
})
export class NgxMatLoadingDirective implements OnDestroy   {

  @Input('ngxMatLoading')
  set loading(loading: BooleanInput) {
    loading ? this.showLoading() : this.hideLoading();
  }

  @Input('ngxMatLoadingOptions')
  options?: NgxMatLoadingOptions;

  get isVisible(): boolean {
    return this._isVisible;
  }
  private _isVisible: boolean = false;

  private _overlayRef?: OverlayRef;
  private _overlayCmpRef?: ComponentRef<NgxMatLoadingComponent>;

  private _elementPosition?: string | null;

  private _overlayDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _overlay: NgxMatLoadingElementOverlay,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Optional() @Inject(NGX_MAT_LOADING_DEFAULT_OPTIONS) private _defaults?: NgxMatLoadingOptions,
  ) { }

  ngOnDestroy() {
    this._overlayDestroyed.next();
    this._overlayDestroyed.complete();
    this._overlayRef?.dispose();
  }

  showLoading() {
    if (this._isVisible) {
      return;
    }
    this._isVisible = true;

    // fix position
    this._setHostElementPosition();

    const options = {
      ...this._defaults,
      ...this.options
    };

    // add overlay
    this._overlayRef = this._overlay.createFor(this._elementRef, {
      positionStrategy: this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      backdropClass: ['ngx-mat-loading-backdrop', options?.backdropClass || 'cdk-overlay-dark-backdrop'],
      panelClass: ['ngx-mat-loading-panel', options?.panelClass || ''],
      hasBackdrop: true
    });

    this._overlayCmpRef = this._overlayRef.attach(new ComponentPortal(NgxMatLoadingComponent));

    this._overlayCmpRef.instance.spinner = options.spinner ?? true;
    this._overlayCmpRef.instance.message = options.message ?? '';
  }

  hideLoading() {
    this._overlayDestroyed?.next();
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
          'Element should have "relative", "absolute" or "sticky" position!',
          this._elementRef.nativeElement)
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
