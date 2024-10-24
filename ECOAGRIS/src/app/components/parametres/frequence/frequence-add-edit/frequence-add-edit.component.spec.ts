import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenceAddEditComponent } from './frequence-add-edit.component';

describe('FrequenceAddEditComponent', () => {
  let component: FrequenceAddEditComponent;
  let fixture: ComponentFixture<FrequenceAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequenceAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequenceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
