import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevageCalculateComponent } from './elevage-calculate.component';

describe('ElevageCalculateComponent', () => {
  let component: ElevageCalculateComponent;
  let fixture: ComponentFixture<ElevageCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevageCalculateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevageCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
