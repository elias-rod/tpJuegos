import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaNumeroComponent } from './adivina-numero.component';

describe('AdivinaNumeroComponent', () => {
  let component: AdivinaNumeroComponent;
  let fixture: ComponentFixture<AdivinaNumeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdivinaNumeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
