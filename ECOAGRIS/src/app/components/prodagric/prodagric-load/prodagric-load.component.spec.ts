import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricLoadComponent } from './prodagric-load.component';

describe('ProdagricLoadComponent', () => {
  let component: ProdagricLoadComponent;
  let fixture: ComponentFixture<ProdagricLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
