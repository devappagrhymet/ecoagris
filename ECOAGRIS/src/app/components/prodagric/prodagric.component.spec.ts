import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricComponent } from './prodagric.component';

describe('ProdagricComponent', () => {
  let component: ProdagricComponent;
  let fixture: ComponentFixture<ProdagricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
