import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone6Component } from './layoutone6.component';

describe('Layoutone6Component', () => {
  let component: Layoutone6Component;
  let fixture: ComponentFixture<Layoutone6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
