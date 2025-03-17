import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecheLoadComponent } from './peche-load.component';

describe('PecheLoadComponent', () => {
  let component: PecheLoadComponent;
  let fixture: ComponentFixture<PecheLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecheLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecheLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
