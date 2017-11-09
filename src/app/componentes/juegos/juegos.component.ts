import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(public RutasService: RutasService) { }

  ngOnInit() {
  }

}
