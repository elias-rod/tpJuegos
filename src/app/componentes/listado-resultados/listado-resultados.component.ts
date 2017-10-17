import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css']
})
export class ListadoResultadosComponent implements OnInit {
  @Input()
  listado: Array<any>;
  
  constructor() { }

  ngOnInit() {
  }

}
