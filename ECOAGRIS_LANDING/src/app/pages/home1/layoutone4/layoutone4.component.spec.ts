import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone4Component } from './layoutone4.component';

describe('Layoutone4Component', () => {
  let component: Layoutone4Component;
  let fixture: ComponentFixture<Layoutone4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
