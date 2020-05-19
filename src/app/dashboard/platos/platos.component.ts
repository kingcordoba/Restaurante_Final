import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatosService } from '../../services/platos.service';
import { UsuariosService } from 'app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AppService } from '../../app.service';
import bsCustomFileInput from 'bs-custom-file-input'
declare var $: any;


@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.scss']
})
export class PlatosComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  titulo;
  idPlatoImagen;

  cargador = false;
  mensajeCargador = 'Validando';


  formulario: FormGroup;
  formularioCrearValidar = false;

  formularioPromo: FormGroup;
  formularioPromoValidar = false;

  datosUsuario: object = {};
  listaPlatos: Array<object> = [];
  platoEditarSeleccionado = false;
  idPlato;

  public respuestaImagenEnviada;
  public resultadoCarga;

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
    bsCustomFileInput.init();
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

  get p() {
    return this.formularioPromo.controls;
  }

  initForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      creador: new FormControl(this.datosUsuario['id'])
    });

    this.formularioPromo = new FormGroup({
      id: new FormControl('', [Validators.required]),
      plato: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      creador: new FormControl('', [Validators.required]),
    });
  }

  guardarPlato() {
    const btnCrear = document.getElementById('btnCrear');
    const btnCerrar = document.getElementById('btnCrearModalCrear');
    if (this.formulario.valid) {
      btnCerrar.setAttribute('disabled', 'true');
      btnCrear.setAttribute('disabled', 'true');
      btnCrear.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...`;
      this.appService.disabledCamposFormularios('formularioCrear');
      this.platosService.agregarPlato(this.formulario.value, this.platoEditarSeleccionado, this.idPlato).subscribe(respuesta => {
        const icono = (respuesta['success'] ? 'success' : 'error');
        Swal.fire({
          icon: icono,
          title: respuesta['msj'],
        });
        if (respuesta['success']) {
          // Limpiamos la tabla
          if (this.listaPlatos.length) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
            });
          }

          this.listarPlatos();
          this.limpiarFormulario();
          $('#modalCrearPlato').modal('hide');
        } else {
          this.validarToken(respuesta);
        }
        this.cargador = false;
      }, error => {
        this.appService.disabledCamposFormularios('formularioCrear', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Enviar`;
        console.log('Error ', error);
        this.cargador = false;
      }, () => {
        this.appService.disabledCamposFormularios('formularioCrear', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Enviar`;
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
    this.platoEditarSeleccionado = false;
  }

  limpiarFormularioPromo() {
    this.formularioPromo.reset();
  }

  validarToken(respuesta) {
    Swal.fire({
      icon: (respuesta['token'] ? 'error' : 'warning'),
      title: respuesta['msj'],
    });
    if (respuesta['token']) {
      this.userService.cerrarSesion();
    } else {
      this.listaPlatos = [];
    }
  }

  elminarPlato(platos) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el usuario ' + platos['nombre'] + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="far fa-trash-alt"></i> Si',
      cancelButtonText: '<i class="fa fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this.cargador = true;
        this.platosService.eliminarPlato(platos)
        .subscribe(
          resp => {
            const icono = (resp['success'] ? 'success' : 'error');
            Swal.fire({
              icon: icono,
              title: resp['msj'],
            });

            if (resp['success']) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
              });

              this.listarPlatos();
            } else {
              if (resp['token']) {
                this.userService.cerrarSesion();
              }
            }
          }, error => {
            console.log(error);
            this.cargador = false;
          }, () => {
            this.cargador = false;
          }
        );
      }
    });
  }

  platoDelDia(platos) {
    let mensaje;
    if (platos['plato_dia']) {
      mensaje = '¿Estas seguro de quitar ' + platos['nombre'] + ' como plato del día?';
    } else {
      mensaje = '¿Estas seguro de colocar ' + platos['nombre'] + ' como plato del día?';
    }
    Swal.fire({
      title: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fas fa-check"></i> Si',
      cancelButtonText: '<i class="fa fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this.cargador = true;
        this.platosService.platoDelDia(platos)
        .subscribe(
          resp => {
            const icono = (resp['success'] ? 'success' : 'error');
            Swal.fire({
              icon: icono,
              title: resp['msj'],
            });

            if (resp['success']) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
              });

              this.listarPlatos();
            } else {
              if (resp['token']) {
                this.userService.cerrarSesion();
              }
            }
          }, error => {
            console.log(error);
            this.cargador = false;
          }, () => {
            this.cargador = false;
          }
        );
      }
    });
  }

  platoPromocion(plato) {
    if (plato['promocion']) {
      this.desactivaPromo(plato);
    } else {
      this.formularioPromo.get('id').setValue(plato['id']);
      this.formularioPromo.get('plato').setValue(plato['nombre']);
      this.formularioPromo.get('creador').setValue(localStorage.getItem('id'));
      $('#modalPromocion').modal('show');
    }
  }

  desactivaPromo(plato) {
    Swal.fire({
      title: '¿Estas seguro de quitar la promoción de ' + plato['nombre'] + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fas fa-check"></i> Si',
      cancelButtonText: '<i class="fa fa-times"></i> No'
    }).then((result) => {
      if (result.value) {
        this.cargador = true;
        this.platosService.quitarPromo(plato)
        .subscribe(
          resp => {
            const icono = (resp['success'] ? 'success' : 'error');
            Swal.fire({
              icon: icono,
              title: resp['msj'],
            });

            if (resp['success']) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
              });

              this.listarPlatos();
            } else {
              if (resp['token']) {
                this.userService.cerrarSesion();
              }
            }
          }, error => {
            console.log(error);
            this.cargador = false;
          }, () => {
            this.cargador = false;
          }
        );
      }
    });
  }

  guardarPromo() {
    const btnCrear = document.getElementById('btnPromo');
    const btnCerrar = document.getElementById('btnPromoModal');
    if (this.formularioPromo.valid) {
      btnCerrar.setAttribute('disabled', 'true');
      btnCrear.setAttribute('disabled', 'true');
      btnCrear.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creando...`;
      this.appService.disabledCamposFormularios('formularioPromo');

      this.platosService.crearPromo(this.formularioPromo.value).subscribe(respuesta => {
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

          this.limpiarFormularioPromo();
          this.listarPlatos();
          $('#modalPromocion').modal('hide');
          // this.listaPlatos.push(respuesta['plato']);
        } else {
          this.validarToken(respuesta);
        }
        this.cargador = false;
      }, error => {
        this.appService.disabledCamposFormularios('formularioPromo', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
        console.log('Error ', error);
        this.cargador = false;
      }, () => {
        this.appService.disabledCamposFormularios('formularioPromo', false);
        btnCerrar.removeAttribute('disabled');
        btnCrear.removeAttribute('disabled');
        btnCrear.innerHTML = `<i class="fas fa-paper-plane"></i> Crear`;
        this.cargador = false;
      });
    } else {
      this.formularioPromo.markAllAsTouched();
      this.formularioPromoValidar = true;
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

  editarPlato(plato) {
    this.platoEditarSeleccionado = true;
    this.formulario.patchValue(plato);
    this.idPlato = plato['id'];
    $('#modalCrearPlato').modal('show');
  }

  foto(plato) {
    this.idPlatoImagen = plato['id'];
    console.log(this.idPlatoImagen);
    $('#modalFoto').modal('show');
  }

  public cargandoImagen(files: FileList) {
    const btnCerrar = document.getElementById('btnModalImagen');
    btnCerrar.setAttribute('disabled', 'true');
    this.platosService.postFileImagen(files[0], this.idPlatoImagen).subscribe(
      response => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          btnCerrar.removeAttribute('disabled');
          Swal.fire({
            icon: 'error',
            title: 'Error en el servidor'
          });
          console.log('Error en el servidor');
        } else {
          if (this.respuestaImagenEnviada.success) {
            this.resultadoCarga = 1;
            Swal.fire({
              icon: 'success',
              title: this.respuestaImagenEnviada.msj
            });
            $('#customFileLang').val('');
            $('.custom-file-label').html('Seleccionar Archivo');
            $('#modalFoto').modal('hide');
            // Limpiamos la tabla
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
            });
            this.listarPlatos();
            btnCerrar.removeAttribute('disabled');
          } else {
            btnCerrar.removeAttribute('disabled');
            Swal.fire({
              icon: 'warning',
              title: this.respuestaImagenEnviada.msj
            });
            this.resultadoCarga = 2;
          }
        }
      },
      error => {
        btnCerrar.removeAttribute('disabled');
        console.log(<any>error);
      }
    );
  }
}
