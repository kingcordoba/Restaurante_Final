import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import { UsuariosService } from 'app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private platosService: PlatosService, private userService: UsuariosService) {
    this.datosUsuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit(): void {
    this.initForm();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      /* below is the relevant part, e.g. translated to spanish */
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ &eacute;l&eacute;ments',
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
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listarPlatos() {
    this.platosService.obtenerPlatos().subscribe(result => {
      console.log("Resulttt ", result);
      if (result['success']) {
        //this.listUsuarios = result['msj'];
        this.dtTrigger.next();
      } else {
        if (result['token']) {
          this.userService.cerrarSesion();
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
    });
  }

  initForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      estado: new FormControl(1),
      creador: this.datosUsuario['id']
    });
  }

  guardarPlato() {
    if (this.formulario.valid) {
      console.log("Formulariooooo ", this.formulario.value);
      const datos = this.formulario.value;
      this.platosService.agregarPlato(datos).subscribe(respuesta =>{
        const icono = (respuesta['success'] ? 'success' : 'error');  
        Swal.fire({
          icon: icono,
          title: respuesta['msj'],
        });
        this.limpiarFormulario();
      }, error =>{
        console.log("Error ", error);
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  limpiarFormulario(){
    this.formulario.reset();
    this.formulario.value.estado = 1;
    this.formulario.value.creador = this.datosUsuario['id'];
  }

}
