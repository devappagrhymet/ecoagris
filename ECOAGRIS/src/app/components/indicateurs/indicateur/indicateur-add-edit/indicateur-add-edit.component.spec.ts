import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurAddEditComponent } from './indicateur-add-edit.component';

describe('IndicateurAddEditComponent', () => {
  let component: IndicateurAddEditComponent;
  let fixture: ComponentFixture<IndicateurAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicateurAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicateurAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
