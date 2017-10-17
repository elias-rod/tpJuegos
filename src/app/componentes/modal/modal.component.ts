import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() parametrosModal: Object;
  @Output() clickBotonPrimario = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
