import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PerfilmostrarService } from '../../services/perfilmostrar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss', './login.component.css']
})
export class LoginComponent implements OnInit {

  cargador: boolean = false;
  mensajeCargador: string = 'Validando';
  data: Date = new Date();
  focus;
  focus1;

  // Formulario
  formulario: FormGroup;
  validaFormulario = false;

  constructor(
    private appService: AppService,
    private _usuarios: UsuariosService,
    private _router: Router,
    private _perfilMostrar: PerfilmostrarService
  ) {
    this.appService.pageTitle = 'Inicio Sesión';
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

  initForm() {
    this.formulario = new FormGroup({
      documento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.formulario.controls;
  }

  public login() {
    const Login = document.getElementsByName('btnLogin')[0];
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      this.validaFormulario = true;
    } else {
      this.cargador = true;
      Login.setAttribute('disabled', 'true');
      Login.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ACCEDIENDO...`;
      this._usuarios.login(this.formulario.value).subscribe(result => {
        if (result['success']) {
          this.validaFormulario = false;
          this.formulario.reset();
          localStorage.setItem('id', result['usuario'].id);
          localStorage.setItem('nro_documento', result['usuario'].nro_documento);
          localStorage.setItem('nombreCompleto', result['usuario'].nombres + ' ' + result['usuario'].apellidos);
          localStorage.setItem('perfil', result['usuario'].fk_perfil);
          localStorage.setItem('usuario', JSON.stringify(result['usuario']));
          localStorage.setItem('token', result['token']);
          localStorage.setItem('tiempoToken', result['tiempoToken']);

          this._perfilMostrar.actualizarDatos(true);

          if (result['usuario'].fk_perfil === 1) {
            window.location.href = 'dashboard';
            //this._router.navigate(['dashboard']);
          } else {
            this._router.navigate(['']);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: result['msj'],
          });
        }
        this.cargador = false;
      }, error => {
        console.log(error)
        this.cargador = false;
        Login.removeAttribute('disabled');
        Login.innerHTML = `ACCEDER <i class="fas fa-sign-in-alt"></i>`;
      }, () => {
        Login.removeAttribute('disabled');
        Login.innerHTML = `ACCEDER <i class="fas fa-sign-in-alt"></i>`;
        this.cargador = false;
      }
      );
    }
  }


  public soloNumeros(e) {
    return this.appService.soloNumeros(e);
  }
}
