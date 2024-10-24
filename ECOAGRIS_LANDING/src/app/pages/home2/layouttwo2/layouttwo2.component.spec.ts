import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo2Component } from './layouttwo2.component';

describe('Layouttwo2Component', () => {
  let component: Layouttwo2Component;
  let fixture: ComponentFixture<Layouttwo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
