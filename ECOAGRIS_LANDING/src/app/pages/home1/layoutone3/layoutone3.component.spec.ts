import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone3Component } from './layoutone3.component';

describe('Layoutone3Component', () => {
  let component: Layoutone3Component;
  let fixture: ComponentFixture<Layoutone3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
