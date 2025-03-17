import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComextIndicListComponent } from './comext-indic-list.component';

describe('ComextIndicListComponent', () => {
  let component: ComextIndicListComponent;
  let fixture: ComponentFixture<ComextIndicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComextIndicListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComextIndicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
