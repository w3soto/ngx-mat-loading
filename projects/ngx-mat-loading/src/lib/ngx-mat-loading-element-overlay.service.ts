import {
  ComponentFactoryResolver, ElementRef,
  Inject,
  Injectable,
  Injector,
  NgZone,
  Renderer2,
  RendererFactory2
} from "@angular/core";
import {
  Overlay, OverlayConfig,
  OverlayContainer,
  OverlayKeyboardDispatcher, OverlayOutsideClickDispatcher,
  OverlayPositionBuilder, OverlayRef,
  ScrollStrategyOptions
} from "@angular/cdk/overlay";
import { DOCUMENT, Location } from "@angular/common";
import { Directionality } from "@angular/cdk/bidi";
import { coerceElement } from "@angular/cdk/coercion";


/**
 * @author: Adrien Miquel
 * @see "https://itnext.io/a-loader-for-your-components-with-angular-cdk-overlay-ebf5a4962e4d"
 */
@Injectable({
  providedIn: 'root'
})
export class NgxMatLoadingElementOverlayContainer extends OverlayContainer {

  public setContainerElement(containerElement: ElementRef | HTMLElement): void {
    this._containerElement = coerceElement(containerElement);
  }

}


/**
 * @author Adrien Miquel
 * @see "https://itnext.io/a-loader-for-your-components-with-angular-cdk-overlay-ebf5a4962e4d"
 */
@Injectable({
  providedIn: 'root'
})
export class NgxMatLoadingElementOverlay extends Overlay {

  private readonly _dynamicOverlayContainer: NgxMatLoadingElementOverlayContainer;
  private renderer: Renderer2;

  constructor(
    scrollStrategies: ScrollStrategyOptions,
    _overlayContainer: NgxMatLoadingElementOverlayContainer,
    _componentFactoryResolver: ComponentFactoryResolver,
    _positionBuilder: OverlayPositionBuilder,
    _keyboardDispatcher: OverlayKeyboardDispatcher,
    _injector: Injector,
    _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any,
    _directionality: Directionality,
    rendererFactory: RendererFactory2,
    _location: Location,
    _outsideClickDispatcher: OverlayOutsideClickDispatcher
  ) {
    super(
      scrollStrategies,
      _overlayContainer,
      _componentFactoryResolver,
      _positionBuilder,
      _keyboardDispatcher,
      _injector,
      _ngZone,
      _document,
      _directionality,
      _location,
      _outsideClickDispatcher
    );
    this.renderer = rendererFactory.createRenderer(null, null);
    this._dynamicOverlayContainer = _overlayContainer;
  }

  private setContainerElement(containerElement: HTMLElement): void {
    //this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
    this._dynamicOverlayContainer.setContainerElement(containerElement);
  }

  public createFor(containerElement: ElementRef | HTMLElement, config?: OverlayConfig): OverlayRef {
    this.setContainerElement(coerceElement(containerElement));
    return super.create(config);
  }

}
