import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecheIndicitemComponent } from './peche-indicitem.component';

describe('PecheIndicitemComponent', () => {
  let component: PecheIndicitemComponent;
  let fixture: ComponentFixture<PecheIndicitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecheIndicitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecheIndicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
