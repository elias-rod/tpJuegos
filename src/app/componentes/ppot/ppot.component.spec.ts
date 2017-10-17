import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpotComponent } from './ppot.component';

describe('PpotComponent', () => {
  let component: PpotComponent;
  let fixture: ComponentFixture<PpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
