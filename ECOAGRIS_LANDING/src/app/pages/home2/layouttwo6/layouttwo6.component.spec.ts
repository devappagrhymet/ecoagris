import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouttwo6Component } from './layouttwo6.component';

describe('Layouttwo6Component', () => {
  let component: Layouttwo6Component;
  let fixture: ComponentFixture<Layouttwo6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layouttwo6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layouttwo6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
