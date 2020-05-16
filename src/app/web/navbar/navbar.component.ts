import { Component, OnInit, ElementRef, SimpleChanges } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PerfilmostrarService } from '../../services/perfilmostrar.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  nombreCompleto = 'Usuario';

  constructor(
    public location: Location, 
    private element : ElementRef,
    private _perfilMostrar: PerfilmostrarService,
    private _router: Router,
    private _usuario: UsuariosService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.mostrarDatosPerfil();
    this.perfilUsuario();
  }

  perfilUsuario() {
    const perfilUsuario = document.getElementById('perfilUsuario');
    const acceder = document.getElementById('acceder');

    if (localStorage.getItem('id')) {
      this.nombreCompleto = localStorage.getItem('nombreCompleto');
      acceder.classList.add('d-none')
      perfilUsuario.classList.remove('d-none');
    } else {
      this.nombreCompleto = 'Usuario';
      perfilUsuario.classList.add('d-none');
      acceder.classList.remove('d-none')
    }
  }

  mostrarDatosPerfil() {
    this._perfilMostrar.obsDatos
    .subscribe(
      (datos) => {
        this.perfilUsuario();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._usuario.cerrarSesion();
      }
    })
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function(){
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if( titlee === '/documentation' ) {
      return true;
    }
    else {
      return false;
    }
  }
}
