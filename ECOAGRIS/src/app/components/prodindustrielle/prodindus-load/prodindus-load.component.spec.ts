import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdindusLoadComponent } from './prodindus-load.component';

describe('ProdindusLoadComponent', () => {
  let component: ProdindusLoadComponent;
  let fixture: ComponentFixture<ProdindusLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdindusLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdindusLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
