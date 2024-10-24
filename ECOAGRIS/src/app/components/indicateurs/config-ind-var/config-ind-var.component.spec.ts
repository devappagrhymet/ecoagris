import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIndVarComponent } from './config-ind-var.component';

describe('ConfigIndVarComponent', () => {
  let component: ConfigIndVarComponent;
  let fixture: ComponentFixture<ConfigIndVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigIndVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigIndVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
