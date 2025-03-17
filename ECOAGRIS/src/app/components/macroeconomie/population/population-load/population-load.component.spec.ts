import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationLoadComponent } from './population-load.component';

describe('PopulationLoadComponent', () => {
  let component: PopulationLoadComponent;
  let fixture: ComponentFixture<PopulationLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
