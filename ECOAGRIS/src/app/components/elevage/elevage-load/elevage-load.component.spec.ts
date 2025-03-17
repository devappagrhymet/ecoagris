import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevageLoadComponent } from './elevage-load.component';

describe('ElevageLoadComponent', () => {
  let component: ElevageLoadComponent;
  let fixture: ComponentFixture<ElevageLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevageLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevageLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
