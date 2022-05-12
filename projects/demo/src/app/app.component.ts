import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { NgxMatLoadingService } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.service";
import { NgxMatLoadingDirective } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.directive";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = false;

  cmpLoading1: boolean = false;
  cmpLoading2: boolean = false;
  cmpLoading3: boolean = false;
  cmpLoading4: boolean = false;

  @ViewChild('loading1', {static: true})
  loading1!: NgxMatLoadingDirective;

  constructor(
    private _loading: NgxMatLoadingService
  ) {}

  toggleLoading() {
    this._loading.showLoading({message: 'Lorem Ipsum', spinner: false});
    setTimeout( () => {
      this._loading.hideLoading();
     }, 8000);
  }

}
