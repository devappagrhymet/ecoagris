import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevageIndictitemComponent } from './elevage-indictitem.component';

describe('ElevageIndictitemComponent', () => {
  let component: ElevageIndictitemComponent;
  let fixture: ComponentFixture<ElevageIndictitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevageIndictitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevageIndictitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
