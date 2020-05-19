import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  titulo;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  listaPedidos: Array<object> = [];
  listaDetalles: Array<object> = [];
  idPediddoSeleccionado;

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
    this.platosService.listaPedidos().subscribe(pedidos => {
      if (pedidos['success']) {
        this.listaPedidos = pedidos['msj'];
        this.dtTrigger.next();
        this.listaDetalles = [];
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

  verDetallePedido(pedido) {
    this.idPediddoSeleccionado = pedido.id;
    this.platosService.detallesPedido(this.idPediddoSeleccionado).subscribe(detalles => {
      if (detalles['success']) {
        this.listaDetalles = detalles['msj'];
        $('#modalPlatosPedido').modal('show');
      } else {
        const icono = (detalles['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: detalles['msj'],
        });
        this.validarToken(detalles);
      }
    }, error => {
      console.log("Error ", error);
    });
  }

  cambiarEstadoPedido(pedido) {
    const datos = {
      pedido: pedido.id
    }
    this.platosService.estadoPedido(datos).subscribe(respuesta => {
      const icono = (respuesta['success'] ? 'success' : 'error');
      Swal.fire({
        icon: icono,
        title: respuesta['msj'],
      });
      if (respuesta['success']) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.listarPedidos();
      }
      this.validarToken(respuesta);
    }, error => {
      console.log("Error ", error);
    });
  }

}
