import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheDashboardComponent } from './marche-dashboard.component';

describe('MarcheDashboardComponent', () => {
  let component: MarcheDashboardComponent;
  let fixture: ComponentFixture<MarcheDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
