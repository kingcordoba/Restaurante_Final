import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UsuariosService } from '../services/usuarios.service';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActivoGuard implements CanActivate {
  

  constructor(
    private _router: Router, 
    public location: Location,
    private _usuarios: UsuariosService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {

    let validar;
        
    await this._usuarios.validarToken().
    toPromise().then(
      result => {
        if (result['success']) {
          //Esta activo
          if (!localStorage.getItem('perfil')) {
            this._router.navigate(['']);
            validar =  false;
          } else {
            validar = true;
          }
        } else {
          //Esta inactivo
          Swal.fire({
            icon: 'error',
            title: result['msj'],
          });
          validar = false;
          this._usuarios.cerrarSesion();
        }
      }, error => {
        console.log(error)
      }
    );

    return validar;
  }
}
