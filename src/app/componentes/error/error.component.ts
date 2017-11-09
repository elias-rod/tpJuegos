import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(public RutasService: RutasService) { }

  ngOnInit() {
  }

}
