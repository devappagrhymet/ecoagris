import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdindusListComponent } from './prodindus-list.component';

describe('ProdindusListComponent', () => {
  let component: ProdindusListComponent;
  let fixture: ComponentFixture<ProdindusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdindusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdindusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
