import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  @Output() detalleCerro = new EventEmitter();
  constructor(public RutasService: RutasService) { }

  ngOnInit() {
  }

}
