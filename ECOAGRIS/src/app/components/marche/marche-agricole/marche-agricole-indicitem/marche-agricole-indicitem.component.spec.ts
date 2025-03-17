import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheAgricoleIndicitemComponent } from './marche-agricole-indicitem.component';

describe('MarcheAgricoleIndicitemComponent', () => {
  let component: MarcheAgricoleIndicitemComponent;
  let fixture: ComponentFixture<MarcheAgricoleIndicitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheAgricoleIndicitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheAgricoleIndicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
