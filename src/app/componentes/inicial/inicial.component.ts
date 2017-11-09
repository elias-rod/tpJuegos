import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  constructor(public RutasService: RutasService) { }

  ngOnInit() {
  }

}
