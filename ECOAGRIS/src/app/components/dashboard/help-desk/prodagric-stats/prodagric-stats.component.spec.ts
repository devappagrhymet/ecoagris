import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricStatsComponent } from './prodagric-stats.component';

describe('ProdagricStatsComponent', () => {
  let component: ProdagricStatsComponent;
  let fixture: ComponentFixture<ProdagricStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
