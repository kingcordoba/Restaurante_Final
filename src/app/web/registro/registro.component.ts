import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss','./registro.component.css']
})
export class RegistroComponent implements OnInit {

  data : Date = new Date();

  formulario: FormGroup;


  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.appService.pageTitle = 'Registro';
    this.initForm();
  }

  ngOnInit() {
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page'); */

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy(){
    /* var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page'); */

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  initForm(){
    this.formulario = new FormGroup({
      documento: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, ]),
      rePassword: new FormControl('', [Validators.required]),
    });
  }

  registrar(){
    if(!this.formulario.valid){
      this.formulario.markAllAsTouched();
      console.log(this.formulario)
    } else {
      console.log('submit ok : ', this.formulario.value);
    }

  }

  get f(){
    return this.formulario.controls;
  }

}
