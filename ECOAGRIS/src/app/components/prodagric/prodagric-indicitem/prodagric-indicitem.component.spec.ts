import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricIndicitemComponent } from './prodagric-indicitem.component';

describe('ProdagricIndicitemComponent', () => {
  let component: ProdagricIndicitemComponent;
  let fixture: ComponentFixture<ProdagricIndicitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricIndicitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricIndicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
