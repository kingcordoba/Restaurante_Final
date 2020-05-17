import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import { UsuariosService } from 'app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  formulario: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  datosUsuario: object = {};
  listaPlatos: Array<object> = [];

  constructor(private platosService: PlatosService, private userService: UsuariosService) {
    this.datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.initForm();
    this.listarPlatos();
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listarPlatos() {
    this.platosService.obtenerPlatos().subscribe(platos => {
      console.log("respuesta ", platos);
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
      console.log("error ", error);
    });
  }

  initForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      estado: new FormControl(1),
      creador: new FormControl(this.datosUsuario['id'])
    });
  }

  guardarPlato() {
    this.listaPlatos = [];
    /* if (this.formulario.valid) {
      const datos = this.formulario.value;
      this.platosService.agregarPlato(datos).subscribe(respuesta => {
        console.log("Platototototot ", respuesta);
        const icono = (respuesta['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: respuesta['msj'],
        });
        if (respuesta['success']) {
          this.limpiarFormulario();
          //this.listarPlatos();
          //this.listaPlatos.push(respuesta['plato']);
          this.destroy();
        } else {
          this.validarToken(respuesta);
        }
      }, error => {
        console.log("Error ", error);
      });
    } else {
      this.formulario.markAllAsTouched();
    } */
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.formulario.get('estado').setValue(1);
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

  initDataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ &eacute;l&eacute;ments',
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
