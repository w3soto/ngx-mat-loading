import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from "@angular/material/button";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMatLoadingModule } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.module";
import { CustomLoadingComponent } from "./custom-loading/custom-loading.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { NGX_MAT_LOADING_DEFAULT_OPTIONS } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.model";



@NgModule({
  declarations: [
    AppComponent,
    CustomLoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    DragDropModule,

    NgxMatLoadingModule
  ],
  providers: [
    {
      provide: NGX_MAT_LOADING_DEFAULT_OPTIONS, useValue: {
        backdropClass: 'ngx-mat-loading-dark-backdrop',
        //blockScroll: true,
        innerOverlay: false,
        //componentType: CustomLoadingComponent,
        componentClass: 'my-loading',
        componentProps: { indicator: 'bar', text: 'LOADING...' }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
