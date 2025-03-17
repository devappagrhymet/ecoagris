import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheBetailIndicitemComponent } from './marche-betail-indicitem.component';

describe('MarcheBetailIndicitemComponent', () => {
  let component: MarcheBetailIndicitemComponent;
  let fixture: ComponentFixture<MarcheBetailIndicitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheBetailIndicitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheBetailIndicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
