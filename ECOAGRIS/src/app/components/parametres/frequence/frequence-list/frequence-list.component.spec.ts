import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenceListComponent } from './frequence-list.component';

describe('FrequenceListComponent', () => {
  let component: FrequenceListComponent;
  let fixture: ComponentFixture<FrequenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequenceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
