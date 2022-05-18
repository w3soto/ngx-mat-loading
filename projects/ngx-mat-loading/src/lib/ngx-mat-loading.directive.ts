import {
  ComponentRef,
  Directive, DoCheck,
  ElementRef, Inject,
  Input,
  isDevMode,
  OnDestroy, OnInit, Optional,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Overlay, OverlayRef, } from "@angular/cdk/overlay";

import { NgxMatLoadingComponent, NgxMatLoadingComponentProps } from "./ngx-mat-loading.component";
import { NgxMatLoadingElementOverlay } from "./ngx-mat-loading-element-overlay.service";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS, NgxMatLoadingOptions } from "./ngx-mat-loading.model";


@Directive({
  selector: '[ngxMatLoading]',
  exportAs: 'ngxMatLoading'
})
export class NgxMatLoadingDirective implements OnInit, OnDestroy, DoCheck   {

  @Input('ngxMatLoading')
  set _show(show: BooleanInput) {
    coerceBooleanProperty(show) ? this.show() : this.hide();
  }

  @Input('ngxMatLoadingBackdropClass')
  backdropClass?: string;

  @Input('ngxMatLoadingPanelClass')
  panelClass?: string;

  @Input('ngxMatLoadingComponentType')
  componentType: ComponentType<any> = NgxMatLoadingComponent;

  @Input('ngxMatLoadingComponentClass')
  componentClass?: string;

  @Input('ngxMatLoadingComponentStyle')
  componentStyle?: {[key:string]: string};

  @Input('ngxMatLoadingComponentProps')
  componentProps?: NgxMatLoadingComponentProps | any;

  @Input('ngxMatLoadingInnerOverlay')
  set innerOverlay(val: BooleanInput) {
    this._innerOverlay = coerceBooleanProperty(val);
  }
  get innerOverlay(): boolean {
    return this._innerOverlay;
  }
  private _innerOverlay: boolean = false;

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

  private _elementPosition?: string | null;

  constructor(
    private _elementRef: ElementRef,
    private _globalOverlay: Overlay,
    private _elementOverlay: NgxMatLoadingElementOverlay,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Optional() @Inject(NGX_MAT_LOADING_DEFAULT_OPTIONS) private _defaults?: NgxMatLoadingOptions,
  ) {
    // set defaults
    this.componentType = this._defaults?.componentType || NgxMatLoadingComponent;
    this.componentClass = this._defaults?.componentClass;
    this.componentStyle = this._defaults?.componentStyle;
    this.backdropClass = this._defaults?.backdropClass;
    this.panelClass = this._defaults?.panelClass;
    this.innerOverlay = this._defaults?.innerOverlay;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.hide();
  }

  ngDoCheck() {
    this.update();
  }

  /**
   * Show loading overlay
   * @param props
   */
  show(props?: NgxMatLoadingComponentProps | any) {

    if (this._visible) {
      this.update(props);
      return;
    }
    this._visible = true;

    // add overlay
    if (this.innerOverlay) {

      // fix position
      this._setHostElementPosition();

      this._overlayRef = this._elementOverlay.createFor(this._elementRef, {
        positionStrategy: this._elementOverlay.position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        backdropClass: ['ngx-mat-loading-backdrop', this.backdropClass || ''],
        panelClass: ['ngx-mat-loading-panel', this.panelClass || ''],
        hasBackdrop: true
      });

    }
    else {

      this._overlayRef = this._globalOverlay.create({
        positionStrategy: this._globalOverlay.position()
          .flexibleConnectedTo(this._elementRef)
          .setOrigin(this._elementRef)
          .withPush(false)
          .withPositions([
            {
              originX: 'start',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'top'
            }
          ]),
        scrollStrategy: this._globalOverlay.scrollStrategies.reposition(),
        panelClass: ['ngx-mat-loading-backdrop', 'ngx-mat-loading-panel',
          this.backdropClass || '', this.panelClass || ''],
        hasBackdrop: false,
      });

    }

    this._componentRef = this._overlayRef.attach(new ComponentPortal(this.componentType));

    if (this.componentClass) {
      this._renderer.addClass(this._componentRef!.location.nativeElement, this.componentClass);
    }

    if (this.componentStyle) {
      Object.keys(this.componentStyle).forEach(k => {
        this._renderer.setStyle(this._componentRef!.location.nativeElement, k, this.componentStyle![k]);
      });
    }

    this._copyHostElementBorderRadius();

    this.update({
      ...this._defaults?.componentProps,
      ...this.componentProps,
      ...props
    });

  }

  /**
   * Update loading overlay position and content component
   * @param props
   */
  update(props?: NgxMatLoadingComponentProps | any) {

    // update inner content
    const instance = this._componentRef?.instance;
    if (props && instance) {
      Object.keys(props).forEach(k => instance[k] = props[k])
    }

    // update size and position
    this._overlayRef?.updateSize({
      width: this._elementRef.nativeElement.offsetWidth,
      height: this._elementRef.nativeElement.offsetHeight,
    });
    this._overlayRef?.updatePosition();

  }

  /**
   * Remove loading overlay
   */
  hide() {
    this._overlayRef?.detach();
    this._overlayRef?.dispose();

    if (this.innerOverlay) {
      this._restoreHostElementPosition();
    }

    this._visible = false;
  }

  /**
   * Copy border radius styles from host element.
   * @private
   */
  _copyHostElementBorderRadius() {
    const style: any = this._document.defaultView?.getComputedStyle(this._elementRef.nativeElement);
    [
      'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'bottom-right-radius',
      'border-start-start-radius', 'border-start-end-radius', 'border-end-start-radius', 'border-end-end-radius'
    ].forEach(corner => {
      this._renderer.setStyle(this._overlayRef!.overlayElement, corner, style[corner]);
    });
  }

  /**
   * Fix host element position when using innerOverlay
   * @private
   */
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

  /**
   * Restore host element position when using innerOverlay
   * @private
   */
  _restoreHostElementPosition() {
    if (this._elementPosition) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'position',
        this._elementPosition != 'static' ? this._elementPosition : null);
    }
  }

}
