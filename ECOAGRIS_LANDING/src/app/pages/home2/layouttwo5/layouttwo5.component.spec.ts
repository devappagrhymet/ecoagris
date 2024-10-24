import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo5Component } from './layouttwo5.component';

describe('Layouttwo5Component', () => {
  let component: Layouttwo5Component;
  let fixture: ComponentFixture<Layouttwo5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
