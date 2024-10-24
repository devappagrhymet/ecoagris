import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricDashboardComponent } from './prodagric-dashboard.component';

describe('ProdagricDashboardComponent', () => {
  let component: ProdagricDashboardComponent;
  let fixture: ComponentFixture<ProdagricDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
