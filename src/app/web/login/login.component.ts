import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss']
})
export class LoginComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;

  constructor(
    private appService: AppService
  ) {
    this.appService.pageTitle = 'Inicio Sesión';
  }

  ngOnInit() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page'); */

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page'); */

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
