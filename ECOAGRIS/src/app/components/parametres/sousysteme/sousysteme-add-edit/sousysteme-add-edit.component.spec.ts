import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousystemeAddEditComponent } from './sousysteme-add-edit.component';

describe('SousystemeAddEditComponent', () => {
  let component: SousystemeAddEditComponent;
  let fixture: ComponentFixture<SousystemeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousystemeAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousystemeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
