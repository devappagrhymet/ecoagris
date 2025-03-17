import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheBetailLoadComponent } from './marche-betail-load.component';

describe('MarcheBetailLoadComponent', () => {
  let component: MarcheBetailLoadComponent;
  let fixture: ComponentFixture<MarcheBetailLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheBetailLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheBetailLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
