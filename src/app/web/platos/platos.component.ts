import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { GetProductosService } from '../../services/get-productos.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss'],
})
export class PlatosComponent implements OnInit {
  
  productos: object[] = [];

  constructor(
    private _productos:GetProductosService,
    private appService: AppService
  ) {
    this.appService.pageTitle = 'Platos';
    this.productos = this._productos.productosMostrar;
  }

  ngOnInit(): void {
  }

  addProducto(producto){
    this._productos.agregarCarrito(producto);
  }

}
