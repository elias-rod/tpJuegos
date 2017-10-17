import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoResultadosComponent } from './listado-resultados.component';

describe('ListadoResultadosComponent', () => {
  let component: ListadoResultadosComponent;
  let fixture: ComponentFixture<ListadoResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
