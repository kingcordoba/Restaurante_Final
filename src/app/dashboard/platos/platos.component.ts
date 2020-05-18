import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import { UsuariosService } from 'app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AppService } from '../../app.service';
declare var $: any;


@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  @ViewChild(DataTableDirective, {static : false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  titulo;

  cargador = false;
  mensajeCargador = 'Validando';


  formulario: FormGroup;
  formularioCrearValidar = false;
  datosUsuario: object = {};
  listaPlatos: Array<object> = [];

  constructor(
    private appService: AppService,
    private platosService: PlatosService,
    private userService: UsuariosService
  ) {
    this.titulo = this.appService.pageTitle = 'Platos';
    this.datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.initForm();
    this.listarPlatos();
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listarPlatos() {
    this.platosService.obtenerPlatos().subscribe(platos => {
      if (platos['success']) {
        this.listaPlatos = platos['msj'];
        this.dtTrigger.next();
      } else {
        const icono = (platos['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: platos['msj'],
        });
        this.validarToken(platos);
      }
    }, error => {
      console.log('error ', error);
    });
  }

  get f() {
    return this.formulario.controls;
  }

  initForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      creador: new FormControl(this.datosUsuario['id'])
    });
  }

  guardarPlato() {
    const btnCrear = document.getElementById('btnCrear');
    const btnCerrar = document.getElementById('btnCrearModalCrear');
    if (this.formulario.valid) {
      btnCerrar.setAttribute('disabled', 'true');
      btnCrear.setAttribute('disabled', 'true');
      btnCrear.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creando...`;
      this.appService.disabledCamposFormularios('formularioCrear');
      
      this.platosService.agregarPlato(this.formulario.value).subscribe(respuesta => {
        const icono = (respuesta['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: respuesta['msj'],
        });

        if (respuesta['success']) {
          // Limpiamos la tabla
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
          });

          this.limpiarFormulario();
          this.listarPlatos();
          $('#modalCrearPlato').modal('hide');
          // this.listaPlatos.push(respuesta['plato']);
        } else {
          this.validarToken(respuesta);
        }
        this.cargador = false;
      }, error => {
        this.appService.disabledCamposFormularios('formularioCrear', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
        console.log('Error ', error);
        this.cargador = false;
      }, () => {
        this.appService.disabledCamposFormularios('formularioCrear', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
        this.cargador = false;
      });
    } else {
      this.formulario.markAllAsTouched();
      this.formularioCrearValidar = true;
    }
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.formulario.get('creador').setValue(this.datosUsuario['id']);
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

  elminarPlato() {

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
