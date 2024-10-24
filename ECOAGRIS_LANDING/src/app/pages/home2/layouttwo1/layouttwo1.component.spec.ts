import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo1Component } from './layouttwo1.component';

describe('Layouttwo1Component', () => {
  let component: Layouttwo1Component;
  let fixture: ComponentFixture<Layouttwo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
