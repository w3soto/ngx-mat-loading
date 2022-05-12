import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  isDevMode,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { BooleanInput } from "@angular/cdk/coercion";
import { ComponentPortal } from "@angular/cdk/portal";
import { OverlayRef, } from "@angular/cdk/overlay";
import { Subject } from "rxjs";

import { NgxMatLoadingComponent } from "./ngx-mat-loading.component";
import { NgxMatLoadingElementOverlay } from "./ngx-mat-loading-element-overlay.service";


@Directive({
  selector: '[ngxMatLoading]',
  exportAs: 'ngxMatLoading'
})
export class NgxMatLoadingDirective implements OnDestroy   {

  @Input('ngxMatLoading')
  set loading(loading: BooleanInput) {
    loading ? this.showLoading() : this.hideLoading();
  }

  @Input('ngxMatLoadingBackdropClass')
  backdropClass: string = 'cdk-overlay-dark-backdrop';

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
    private _renderer: Renderer2
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
    this._elementPosition = null;
    const style = window.getComputedStyle(this._elementRef.nativeElement);
    if (['absolute', 'relative', 'sticky'].indexOf(style.position) == -1) {
      this._elementPosition = style.position;
      if (isDevMode()) {
        console.warn('[NgxMatLoading]',
          'Element should have "relative", "absolute" or "sticky" position!',
          this._elementRef.nativeElement)
      }
      this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
    }

    // add overlay
    this._overlayRef = this._overlay.createFor(this._elementRef, {
      positionStrategy: this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true
    });

    this._overlayCmpRef = this._overlayRef.attach(new ComponentPortal(NgxMatLoadingComponent));
  }

  hideLoading() {
    this._overlayDestroyed?.next();
    this._overlayRef?.dispose();
    if (this._elementPosition) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'position',
        this._elementPosition != 'static' ? this._elementPosition : null);
    }
    this._isVisible = false;
  }

}
