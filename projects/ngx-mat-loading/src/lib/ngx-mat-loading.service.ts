import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { NgxMatLoadingComponent } from "./ngx-mat-loading.component";


@Injectable({
  providedIn: 'root'
})
export class NgxMatLoadingService {

  private _overlayRef?: OverlayRef;

  get visible(): boolean {
    return !!this._overlayRef?.hasAttached()  ;
  }

  constructor(
    private _overlay: Overlay
  ) { }

  showLoading() {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this._overlayRef.attach(new ComponentPortal(NgxMatLoadingComponent));
  }

  hideLoading() {
    this._overlayRef?.dispose();
  }

}
