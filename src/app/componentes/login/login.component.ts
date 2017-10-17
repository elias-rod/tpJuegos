import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;

  constructor() { }

  ngOnInit() {
  }

  autocompletar(perfil : string) : void{
    switch (perfil) {
      case "administrador":
        this.email = "a@a.com";
        this.password = "a";
        break;
      case "comprador":
        this.email = "b@b.com";
        this.password = "a";
        break;
      case "vendedor":
        this.email = "c@c.com";
        this.password = "a";
        break;
    }
  }
}
