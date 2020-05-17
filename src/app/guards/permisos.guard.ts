import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ModuloService } from '../services/modulo.service';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  
  constructor(
    public location: Location,
    private _modulos: ModuloService,
    private _usuarios: UsuariosService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {

    let validar;
    const _location = state.url.split('/')[2];

    await this._modulos.validarPermiso(_location).
    toPromise().then(
      result => {
        if (result['success']) {
          //Esta activo
          validar = true;
        } else {
          //Esta inactivo
          if (result['token']) {
            Swal.fire({
              icon: 'error',
              title: result['msj'],
            });
            validar = false;
            this._usuarios.cerrarSesion();
          } else {
            Swal.fire({
              icon: 'error',
              title: result['msj'],
            });
          }
        }
      }, error => {
        console.log(error)
      }
    );

    return validar;
  }
}
