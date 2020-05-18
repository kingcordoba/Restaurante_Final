import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetProductosService } from 'app/services/get-productos.service';

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
  newProductos: object[] = [];
  total: number = 0;


  constructor(
    private _productos: GetProductosService,
    private appService: AppService,
  ) {
    this.appService.pageTitle = 'Pedido';
    this.initForm();
    this.traerProductos();
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
    console.log('datos pedido: ', this.formulario.value);
  }

  get f() {
    return this.formulario.controls;
  }

  public soloNumeros(e) {
    return this.appService.soloNumeros(e);
  }

  initForm() {
    this.formulario = new FormGroup({
      nro_documento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
      listaProductos: new FormControl([], [Validators.required]),
      total: new FormControl('', [Validators.required]),
    });
    this.checkUserData();
  }

  checkUserData(){
    if (localStorage.getItem('usuario')) {
      const datos = JSON.parse(localStorage.getItem('usuario'));
      Object.keys(datos).forEach(pos => {
        if (this.formulario.controls[pos]) {
          this.formulario.get(pos).setValue(datos[pos]);
        }
      })
    }
  }

  traerProductos() {
    this.validarProducto(this._productos.getList());
  }

  validarProducto(datos){
    const nuevaLista = [];
    let total: number = 0;

    datos.forEach(element => {
      const posicion = nuevaLista.indexOf(element);
      if (posicion === -1) {
        element.cantidad = 1;
        nuevaLista.push(element);
      } else {
        nuevaLista[posicion].cantidad += 1;
      }
    });

    nuevaLista.forEach(element => {
      total += element.precio * element.cantidad;
    });

    this.newProductos = nuevaLista;
    this.total = total;
    this.formulario.get('listaProductos').setValue(this.newProductos);
    this.formulario.get('total').setValue(this.total);
  }

}
