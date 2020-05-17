import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
import { ModuloService } from '../../services/modulo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  modulos: object[] = [];

  constructor(
    private _usuario: UsuariosService,
    private _modulos: ModuloService
  ) { }

  ngOnInit(): void {
    this.listaModulosUsuario();
  }

  listaModulosUsuario(){
    this._modulos.listaModulosUsuario()
    .subscribe(
      result => {
        if (result['success']) {
          this.modulos = result['msj'];
        } else {
          if (result['token']) {
            this._usuario.cerrarSesion();
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


}
