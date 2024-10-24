import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagneAddEditComponent } from './campagne-add-edit.component';

describe('CampagneAddEditComponent', () => {
  let component: CampagneAddEditComponent;
  let fixture: ComponentFixture<CampagneAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampagneAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagneAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
