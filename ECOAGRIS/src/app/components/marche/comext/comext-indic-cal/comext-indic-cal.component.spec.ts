import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextIndicCalComponent } from './comext-indic-cal.component';

describe('ComextIndicCalComponent', () => {
  let component: ComextIndicCalComponent;
  let fixture: ComponentFixture<ComextIndicCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextIndicCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextIndicCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
