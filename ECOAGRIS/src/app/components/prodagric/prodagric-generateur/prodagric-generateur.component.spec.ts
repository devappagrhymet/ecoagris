import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdagricGenerateurComponent } from './prodagric-generateur.component';

describe('ProdagricGenerateurComponent', () => {
  let component: ProdagricGenerateurComponent;
  let fixture: ComponentFixture<ProdagricGenerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdagricGenerateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdagricGenerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
