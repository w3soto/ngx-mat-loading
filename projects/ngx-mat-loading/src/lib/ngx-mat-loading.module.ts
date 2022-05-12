import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";

import { NgxMatLoadingComponent } from './ngx-mat-loading.component';
import { NgxMatLoadingDirective } from './ngx-mat-loading.directive';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    NgxMatLoadingComponent,
    NgxMatLoadingDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NgxMatLoadingComponent,
    NgxMatLoadingDirective
  ]
})
export class NgxMatLoadingModule { }
