import { Component } from '@angular/core';
import { NgxMatLoadingService } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.service";
import { CustomLoadingComponent } from "./custom-loading/custom-loading.component";
import { of } from "rxjs";
import { concatMap, delay, finalize, tap } from "rxjs/operators";


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
      text: 'Starting...'
    }, {
      componentStyle: {
        'width': '150px'
      }
    });

    of(0, 3, 15, 34, 62, 63, 64, 65, 99, 100).pipe(
      concatMap(x => of(x).pipe(delay(200 + Math.round(Math.random()*800)))),
      tap(v => this._loading.update({ value: v, text: `Processing ${v}%...` })),
      finalize(() => this._loading.hide())
    ).subscribe();
  }

  showLoading1() {
    this.cmpLoading1 = true;
    setTimeout( () => this.cmpLoading1 = false, 2000);
  }

}
