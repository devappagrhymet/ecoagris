import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevageDashboardComponent } from './elevage-dashboard.component';

describe('ElevageDashboardComponent', () => {
  let component: ElevageDashboardComponent;
  let fixture: ComponentFixture<ElevageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevageDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
