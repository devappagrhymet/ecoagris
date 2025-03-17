import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricIndicCalComponent } from './prodagric-indic-cal.component';

describe('ProdagricIndicCalComponent', () => {
  let component: ProdagricIndicCalComponent;
  let fixture: ComponentFixture<ProdagricIndicCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricIndicCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricIndicCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
