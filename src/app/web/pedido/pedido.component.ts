import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss', './pedido.component.css'],
})
export class PedidoComponent implements OnInit {

  cargador = false;
  mensajeCargador = 'Registrando';
  data: Date = new Date();
  formulario: FormGroup;
  validaFormulario = false;


  constructor(
    private appService: AppService,
  ) {
    this.appService.pageTitle = 'Registro';
  }

  ngOnInit() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page'); */
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page'); */

    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  realizarPedido() {

  }

  get f() {
    return this.formulario.controls;
  }

  public soloNumeros(e) {
    return this.appService.soloNumeros(e);
  }

}
