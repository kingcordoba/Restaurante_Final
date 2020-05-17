import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static : false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  titulo;
  listUsuarios: object[] = [];

  cargador = false;
  mensajeCargador = 'Validando';

  formularioCrear: FormGroup;
  formularioCrearValidar = false;

  constructor(
    private appService: AppService,
    private _usuario: UsuariosService,
  ) {
    this.titulo = this.appService.pageTitle = 'Usuarios';
    this.initForm();
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

  get f() {
    return this.formularioCrear.controls;
  }

  initForm() {
    this.formularioCrear = new FormGroup({
      documento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombres: new FormControl('', [Validators.required]),
      perfil: new FormControl('1', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
    });
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

  crearUsuario() {
    const btnCrearUsuario = document.getElementById('btnCrearUsuario');
    if (!this.formularioCrear.valid) {
      this.formularioCrear.markAllAsTouched();
      this.formularioCrearValidar = true;
    } else {
      this.cargador = true;
      this.mensajeCargador = 'Enviando';
      btnCrearUsuario.setAttribute('disabled', 'true');
      btnCrearUsuario.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creando...`;
      this._usuario.crearUsuario(this.formularioCrear.value)
      .subscribe(
        result => {
          if (result['success']) {
            this.formularioCrearValidar = false;
            this.formularioCrear.reset();

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
            });

            this.listaUsuarios();
            $('#modalCrearUsuario').modal('hide');
            Swal.fire({
              icon: 'success',
              title: result['msj'],
            });
          } else {
            if (result['token']) {
              Swal.fire({
                icon: 'error',
                title: result['msj'],
              });
              this._usuario.cerrarSesion();
            } else {
              Swal.fire({
                icon: 'warning',
                title: result['msj'],
              });
            }
          }
          this.cargador = false;
        }, error => {
          console.log(error);
          btnCrearUsuario.removeAttribute('disabled');
          btnCrearUsuario.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
          this.cargador = false;
        }, () => {
          btnCrearUsuario.removeAttribute('disabled');
          btnCrearUsuario.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
          this.cargador = false;
        }
      );
    }
  }

  public soloNumeros(e) {
    return this.appService.soloNumeros(e);
  }
}
