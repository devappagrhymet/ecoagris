import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo3Component } from './layouttwo3.component';

describe('Layouttwo3Component', () => {
  let component: Layouttwo3Component;
  let fixture: ComponentFixture<Layouttwo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
