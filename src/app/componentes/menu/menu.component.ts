import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuarioActual: string;
  
  constructor() { }

  ngOnInit() {
  }

  verificarLogueo(){
    //console.log(localStorage.getItem('usuarioActual'));
    if (this.usuarioActual = localStorage.getItem('usuarioActual')) {
      this.usuarioActual = JSON.parse(this.usuarioActual)
      return true;
    }
      return false;
  }
}
