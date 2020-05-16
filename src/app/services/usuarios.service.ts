import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from './configuracion.service';
import { Router } from '@angular/router';
import { PerfilmostrarService } from './perfilmostrar.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private urlApi: string;

  constructor(
    private http: HttpClient,
    private _perfilMostrar: PerfilmostrarService,
    private _router: Router
  ) {
    this.urlApi = CONFIG.urlAPi;
  }

  public registrarUsuario(usuario: object){
    return this.http.post(this.urlApi + 'registrarse', usuario);
  }

  public login(usuario: object){
    return this.http.get(this.urlApi + 'login/' + usuario['documento'] + '/' + usuario['password']);
  }
  
  public actualizarPerfil(usuario: object){
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'actualizarDatos', usuario, {headers});
  }

  public actualizarDatosStorage(usuario: object){
    localStorage.setItem('nombreCompleto', usuario['nombres'] + ' ' + usuario['apellidos']);
    localStorage.setItem('perfil', usuario['fk_perfil']);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this._perfilMostrar.actualizarDatos(false);
  }

  public validarToken(){
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'validarToken', {headers});
  }

  public cerrarSesion(){
    localStorage.clear();
    this._perfilMostrar.actualizarDatos(false);
    this._router.navigate(['']);
  }
}
