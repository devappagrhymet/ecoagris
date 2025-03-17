import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextLoadComponent } from './comext-load.component';

describe('ComextLoadComponent', () => {
  let component: ComextLoadComponent;
  let fixture: ComponentFixture<ComextLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
