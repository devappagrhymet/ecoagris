import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecheCalculateComponent } from './peche-calculate.component';

describe('PecheCalculateComponent', () => {
  let component: PecheCalculateComponent;
  let fixture: ComponentFixture<PecheCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecheCalculateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecheCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
