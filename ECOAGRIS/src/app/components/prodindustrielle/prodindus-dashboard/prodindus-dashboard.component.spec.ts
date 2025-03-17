import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdindusDashboardComponent } from './prodindus-dashboard.component';

describe('ProdindusDashboardComponent', () => {
  let component: ProdindusDashboardComponent;
  let fixture: ComponentFixture<ProdindusDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdindusDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdindusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
