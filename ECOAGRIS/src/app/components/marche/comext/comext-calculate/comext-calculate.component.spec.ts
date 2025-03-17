import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextCalculateComponent } from './comext-calculate.component';

describe('ComextCalculateComponent', () => {
  let component: ComextCalculateComponent;
  let fixture: ComponentFixture<ComextCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextCalculateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
