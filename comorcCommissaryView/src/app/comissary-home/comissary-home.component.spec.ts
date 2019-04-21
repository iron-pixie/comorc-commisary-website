import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissaryHomeComponent } from './comissary-home.component';

describe('ComissaryHomeComponent', () => {
  let component: ComissaryHomeComponent;
  let fixture: ComponentFixture<ComissaryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissaryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissaryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
