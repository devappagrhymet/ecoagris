import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauAddEditComponent } from './niveau-add-edit.component';

describe('NiveauAddEditComponent', () => {
  let component: NiveauAddEditComponent;
  let fixture: ComponentFixture<NiveauAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
