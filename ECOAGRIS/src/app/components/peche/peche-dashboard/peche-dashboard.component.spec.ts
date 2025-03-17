import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecheDashboardComponent } from './peche-dashboard.component';

describe('PecheDashboardComponent', () => {
  let component: PecheDashboardComponent;
  let fixture: ComponentFixture<PecheDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecheDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecheDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
