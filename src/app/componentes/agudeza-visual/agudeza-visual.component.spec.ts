import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgudezaVisualComponent } from './agudeza-visual.component';

describe('AgudezaVisualComponent', () => {
  let component: AgudezaVisualComponent;
  let fixture: ComponentFixture<AgudezaVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgudezaVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgudezaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
