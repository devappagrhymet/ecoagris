import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetailIndicCalComponent } from './betail-indic-cal.component';

describe('BetailIndicCalComponent', () => {
  let component: BetailIndicCalComponent;
  let fixture: ComponentFixture<BetailIndicCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetailIndicCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetailIndicCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
