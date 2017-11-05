import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  @Output() detalleCerro = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
