import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivadminListComponent } from './divadmin-list.component';

describe('DivadminListComponent', () => {
  let component: DivadminListComponent;
  let fixture: ComponentFixture<DivadminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivadminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivadminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
