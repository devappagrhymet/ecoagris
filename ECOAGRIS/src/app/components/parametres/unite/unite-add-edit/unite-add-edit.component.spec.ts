import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteAddEditComponent } from './unite-add-edit.component';

describe('UniteAddEditComponent', () => {
  let component: UniteAddEditComponent;
  let fixture: ComponentFixture<UniteAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniteAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
