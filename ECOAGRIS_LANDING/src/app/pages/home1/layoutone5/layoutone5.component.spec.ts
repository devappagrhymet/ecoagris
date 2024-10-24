import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutone5Component } from './layoutone5.component';

describe('Layoutone5Component', () => {
  let component: Layoutone5Component;
  let fixture: ComponentFixture<Layoutone5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutone5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutone5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
