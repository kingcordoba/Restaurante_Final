import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  titulo;


  constructor(
    private appService: AppService,
  ) {
    this.titulo = this.appService.pageTitle = 'Pedidos';
  }

  ngOnInit(): void {
  }

}
