import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLoadComponent } from './stock-load.component';

describe('StockLoadComponent', () => {
  let component: StockLoadComponent;
  let fixture: ComponentFixture<StockLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
