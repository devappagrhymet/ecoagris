import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtailIndicListComponent } from './btail-indic-list.component';

describe('BtailIndicListComponent', () => {
  let component: BtailIndicListComponent;
  let fixture: ComponentFixture<BtailIndicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtailIndicListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtailIndicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
