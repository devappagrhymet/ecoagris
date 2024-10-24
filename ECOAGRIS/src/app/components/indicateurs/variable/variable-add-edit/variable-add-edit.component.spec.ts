import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableAddEditComponent } from './variable-add-edit.component';

describe('VariableAddEditComponent', () => {
  let component: VariableAddEditComponent;
  let fixture: ComponentFixture<VariableAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
