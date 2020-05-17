import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  titulo;
  listUsuarios: object[] = [];

  private urlApi: string;

  dtTrigger = new Subject();

  constructor(
    private appService: AppService,
    private _usuario: UsuariosService,
  ) {
    this.titulo = this.appService.pageTitle = 'Usuarios';
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      /* below is the relevant part, e.g. translated to spanish */ 
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
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

    this.listaUsuarios();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  listaUsuarios() {
    this._usuario.listaUsusuario()
    .subscribe(
      result => {
        if (result['success']) {
          this.listUsuarios = result['msj'];
          this.dtTrigger.next();
        } else {
          if (result['token']) {
            this._usuario.cerrarSesion();
            Swal.fire({
              icon: 'error',
              title: result['msj'],
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: result['msj'],
            });
          }
        }
      }, error => {
        console.log(error)
      }
    );
  }
}
