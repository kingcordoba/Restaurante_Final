import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss', './registro.component.css'],
  styles: [`
    .not-read {
      filter: blur(2px);
      pointer-events: none;
    }
  `]
})
export class RegistroComponent implements OnInit {

  cargador: boolean = false;
  mensajeCargador: string = 'Registrando';
  data: Date = new Date();
  formulario: FormGroup;
  validaFormulario = false;

  constructor(
    private appService: AppService,
    private _usuarios: UsuariosService,
    private _router: Router
  ) {
    this.appService.pageTitle = 'Registro';
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
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
    });
  }

  registrar() {
    const btnRegistrar = document.getElementsByName('btnRegistro')[0];
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      this.validaFormulario = true;
    } else {
      this.cargador = true;
      btnRegistrar.setAttribute('disabled', 'true');
      btnRegistrar.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> CREANDO...`;
      this._usuarios.registrarUsuario(this.formulario.value).subscribe(result => {
        if (result['success']) {
          this.validaFormulario = false;
          this.formulario.reset();
          Swal.fire({
            icon: 'success',
            title: result['msj'],
          })
          this._router.navigate(['login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: result['msj'],
          });
        }
        this.cargador = false;
      }, error => {
        console.log(error);
        btnRegistrar.removeAttribute('disabled');
        btnRegistrar.innerHTML = `CREAR CUENTA <i class="fas fa-sign-in-alt"></i>`;
        this.cargador = false;
      }, () => {
        btnRegistrar.removeAttribute('disabled');
        btnRegistrar.innerHTML = `CREAR CUENTA <i class="fas fa-sign-in-alt"></i>`;
        this.cargador = false;
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