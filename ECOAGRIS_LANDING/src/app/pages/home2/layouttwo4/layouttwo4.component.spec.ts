import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo4Component } from './layouttwo4.component';

describe('Layouttwo4Component', () => {
  let component: Layouttwo4Component;
  let fixture: ComponentFixture<Layouttwo4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
