import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { GetProductosService } from '../../services/get-productos.service';
import { PlatosService } from '../../services/platos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss'],
})
export class PlatosComponent implements OnInit {

  listaPlatos: Array<object> = [];

  constructor(
    private _productos: GetProductosService,
    private appService: AppService,
    private platosService: PlatosService,
  ) {
    this.appService.pageTitle = 'Platos';
  }

  ngOnInit(): void {
    this.listarPlatos();
  }

  addProducto(producto) {
    this._productos.agregarCarrito(producto);
  }

  listarPlatos() {
    this.platosService.obtenerPlatos().subscribe(platos => {
      if (platos['success']) {
        this.listaPlatos = platos['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

}
