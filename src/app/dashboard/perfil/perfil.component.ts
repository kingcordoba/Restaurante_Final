import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  titulo;
  formulario: FormGroup;
  validaFormulario = false;
  usuario: Object;

  constructor(
    private appService: AppService,
    private _usuarios: UsuariosService
  ) {
    this.titulo = this.appService.pageTitle = 'Perfil';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.formulario = new FormGroup({
      id: new FormControl(this.usuario['id'], [Validators.required]),
      telefono: new FormControl(this.usuario['telefono'], [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombres: new FormControl(this.usuario['nombres'], [Validators.required]),
      apellidos: new FormControl(this.usuario['apellidos'], [Validators.required]),
      correo: new FormControl(this.usuario['correo'], [Validators.required]),
      direccion: new FormControl(this.usuario['direccion'], [Validators.required])
    });
  }

  actualizar() {
    console.log('funca');
    const btnPerfil = document.getElementsByName('btnPerfil')[0];
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      this.validaFormulario = true;
    } else {
      btnPerfil.setAttribute('disabled', 'true');
      btnPerfil.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Actualizando...`;
      this._usuarios.actualizarPerfil(this.formulario.value)
      .subscribe(
        result => {
          if (result['success']) {
            this.validaFormulario = false;
            this._usuarios.actualizarDatosStorage(result['usuario']);
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
              this._usuarios.cerrarSesion();
            } else {
              Swal.fire({
                icon: 'warning',
                title: result['msj'],
              });
            }
          }
        }, error => {
          console.log(error)
        }, () => {
          btnPerfil.removeAttribute('disabled');
          btnPerfil.innerHTML = `Actualizar <i class="fas fa-paper-plane"></i>`;
        }
      );
    }
  }

  get f() {
    return this.formulario.controls;
  }

  public soloNumeros(e) {
    return this.appService.soloNumeros(e);
  }

}
