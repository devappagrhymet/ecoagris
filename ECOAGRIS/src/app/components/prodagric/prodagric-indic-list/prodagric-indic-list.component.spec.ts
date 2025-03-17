import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricIndicListComponent } from './prodagric-indic-list.component';

describe('ProdagricIndicListComponent', () => {
  let component: ProdagricIndicListComponent;
  let fixture: ComponentFixture<ProdagricIndicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricIndicListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricIndicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
