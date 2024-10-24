import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFormuleAddEditComponent } from './config-formule-add-edit.component';

describe('ConfigFormuleAddEditComponent', () => {
  let component: ConfigFormuleAddEditComponent;
  let fixture: ComponentFixture<ConfigFormuleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigFormuleAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigFormuleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
