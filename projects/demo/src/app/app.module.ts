import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from "@angular/material/button";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { OverlayModule } from "@angular/cdk/overlay";
import { TestComponent } from './test/test.component';
import { NgxMatLoadingModule } from "../../../ngx-mat-loading/src/lib/ngx-mat-loading.module";
import { DragDropModule } from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    DragDropModule,

    NgxMatLoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
