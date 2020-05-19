import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetProductosService } from 'app/services/get-productos.service';
import Swal from 'sweetalert2';
import { PlatosService } from '../../services/platos.service';
import { Router } from '@angular/router';

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
    private _platos: PlatosService,
    private _router: Router
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
    const btnRegistrar = document.getElementsByName('btnRegistro')[0];
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      this.validaFormulario = true;
    } else {
      this.cargador = true;
      btnRegistrar.setAttribute('disabled', 'true');
      btnRegistrar.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> REALIZANDO PEDIDO...`;
      this._platos.realizarPedido(this.formulario.value).subscribe(result => {
        if (result['success']) {
          this.validaFormulario = false;
          this.formulario.reset();
          this._productos.vaciarCarrito();
          Swal.fire({
            icon: 'success',
            title: result['msj'],
          });
          this._router.navigate(['']);
        } else {
          Swal.fire({
            icon: 'error',
            title: result['msj'],
          });
        }
        this.cargador = false;
      }, error => {
        console.log(error);
        btnRegistrar.removeAttribute('disabled');
        btnRegistrar.innerHTML = `REALIZAR PEDIDO <i class="fas fa-shopping-cart">`;
        this.cargador = false;
      }, () => {
        btnRegistrar.removeAttribute('disabled');
        btnRegistrar.innerHTML = `REALIZAR PEDIDO <i class="fas fa-shopping-cart">`;
        this.cargador = false;
      }
      );
    }
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
