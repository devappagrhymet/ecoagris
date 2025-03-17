import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroDashboardComponent } from './macro-dashboard.component';

describe('MacroDashboardComponent', () => {
  let component: MacroDashboardComponent;
  let fixture: ComponentFixture<MacroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
