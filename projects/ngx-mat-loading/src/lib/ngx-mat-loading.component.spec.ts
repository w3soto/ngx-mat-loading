import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatLoadingComponent } from './ngx-mat-loading.component';

describe('NgxMatLoadingComponent', () => {
  let component: NgxMatLoadingComponent;
  let fixture: ComponentFixture<NgxMatLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
