import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheAgricoleLoadComponent } from './marche-agricole-load.component';

describe('MarcheAgricoleLoadComponent', () => {
  let component: MarcheAgricoleLoadComponent;
  let fixture: ComponentFixture<MarcheAgricoleLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheAgricoleLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheAgricoleLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
