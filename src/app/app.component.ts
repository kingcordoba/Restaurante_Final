import { Component, OnInit } from '@angular/core';
import { GetProductosService } from './services/get-productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Restaurante';

  constructor( private _productos: GetProductosService){

  }

}
