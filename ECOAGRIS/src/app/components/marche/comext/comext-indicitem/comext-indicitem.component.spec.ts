import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextIndicitemComponent } from './comext-indicitem.component';

describe('ComextIndicitemComponent', () => {
  let component: ComextIndicitemComponent;
  let fixture: ComponentFixture<ComextIndicitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextIndicitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextIndicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
