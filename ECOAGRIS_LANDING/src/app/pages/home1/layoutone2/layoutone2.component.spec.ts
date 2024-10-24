import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone2Component } from './layoutone2.component';

describe('Layoutone2Component', () => {
  let component: Layoutone2Component;
  let fixture: ComponentFixture<Layoutone2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
