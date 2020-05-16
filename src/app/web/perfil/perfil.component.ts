import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css', '../../../assets/sass/now-ui-kit.scss']
})
export class PerfilComponent implements OnInit {
  data: Date = new Date();

  formulario: FormGroup;
  validaFormulario = false;
  usuario: Object;


  constructor(
    private appService: AppService,
    private _usuarios: UsuariosService,
    private _router: Router
  ) {
    this.appService.pageTitle = 'Perfil';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.initForm();
  }

  ngOnInit() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page'); */    
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page'); */

    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  initForm(){
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
    const btnPerfil = document.getElementsByName('btnPerfil')[0];
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      this.validaFormulario = true;
    } else {
      btnPerfil.setAttribute('disabled', 'true');
      btnPerfil.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ACTUALIZANDO...`;
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
          btnPerfil.innerHTML = `ACTUALIZAR <i class="fas fa-paper-plane"></i>`;
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
