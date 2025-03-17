import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricoleIndicCalComponent } from './agricole-indic-cal.component';

describe('AgricoleIndicCalComponent', () => {
  let component: AgricoleIndicCalComponent;
  let fixture: ComponentFixture<AgricoleIndicCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricoleIndicCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricoleIndicCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
