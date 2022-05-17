import { Component, ViewChild } from '@angular/core';
import { NgxMatLoadingService } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.service";
import { CustomLoadingComponent } from "./custom-loading/custom-loading.component";
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

  customLoadingComponent = CustomLoadingComponent;

  constructor(
    private _loading: NgxMatLoadingService
  ) {}

  showGlobalLoading() {

    this._loading.show({
      mode: "determinate",
      value: 0,
      text: 'Processing 0%...'
    }, {
      //componentType: CustomLoadingComponent
    });

    let val = 1;
    let interval = setInterval(() => {
      this._loading.update({value: val, text: 'Processing ' + val + '%...'});
      val += 1;
    }, 50);

    setTimeout( () => {
      clearInterval(interval);
     }, 5000);

    setTimeout( () => {
      this._loading.hide();
    }, 6000);
  }

  showLoading1() {
    this.cmpLoading1 = true;
    setTimeout( () => this.cmpLoading1 = false, 2000);
  }

}
