import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  titulo;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  listaPedidos: Array<object> = [];

  constructor(
    private appService: AppService,
    private platosService: PlatosService,
    private userService: UsuariosService,
  ) {
    this.titulo = this.appService.pageTitle = 'Pedidos';
    this.listarPedidos();
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listarPedidos() {
    this.platosService.obtenerPedidos().subscribe(pedidos => {
      console.log("Peidososos ", pedidos);
      if (pedidos['success']) {
        this.listaPedidos = pedidos['msj'];
        this.dtTrigger.next();
      } else {
        const icono = (pedidos['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: pedidos['msj'],
        });
        this.validarToken(pedidos);
      }
    }, error => {
      console.log('error ', error);
    });
  }

  validarToken(respuesta) {
    Swal.fire({
      icon: (respuesta['token'] ? 'error' : 'warning'),
      title: respuesta['msj'],
    });
    if (respuesta['token']) {
      this.userService.cerrarSesion();
    } else {
      this.listaPedidos = [];
    }
  }

  initDataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: '_START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending: ': Activar para ordenar la tabla en orden descendente'
        }
      }
    };
  }

}
