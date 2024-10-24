import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFormuleListComponent } from './config-formule-list.component';

describe('ConfigFormuleListComponent', () => {
  let component: ConfigFormuleListComponent;
  let fixture: ComponentFixture<ConfigFormuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigFormuleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigFormuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
