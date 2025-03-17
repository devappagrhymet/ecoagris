import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricoleIndicListComponent } from './agricole-indic-list.component';

describe('AgricoleIndicListComponent', () => {
  let component: AgricoleIndicListComponent;
  let fixture: ComponentFixture<AgricoleIndicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricoleIndicListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricoleIndicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
