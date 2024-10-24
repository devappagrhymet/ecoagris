import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone1Component } from './layoutone1.component';

describe('Layoutone1Component', () => {
  let component: Layoutone1Component;
  let fixture: ComponentFixture<Layoutone1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
