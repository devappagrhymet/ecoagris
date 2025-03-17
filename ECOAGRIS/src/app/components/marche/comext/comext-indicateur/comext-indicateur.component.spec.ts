import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextIndicateurComponent } from './comext-indicateur.component';

describe('ComextIndicateurComponent', () => {
  let component: ComextIndicateurComponent;
  let fixture: ComponentFixture<ComextIndicateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextIndicateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
