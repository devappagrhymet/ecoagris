import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousystemeListComponent } from './sousysteme-list.component';

describe('SousystemeListComponent', () => {
  let component: SousystemeListComponent;
  let fixture: ComponentFixture<SousystemeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousystemeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousystemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
