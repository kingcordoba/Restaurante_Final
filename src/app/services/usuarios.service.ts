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
  private headers = new HttpHeaders({
    'Authorization': localStorage.getItem('token'),
    'tokenTime': localStorage.getItem('tiempoToken')
  });

  constructor(
    private http: HttpClient,
    private _perfilMostrar: PerfilmostrarService,
    private _router: Router
  ) {
    this.urlApi = CONFIG.urlAPi;
  }

  public listaUsusuario() {
    return this.http.get(this.urlApi + 'usuarios/lista', {headers: this.headers});
  }

  public crearUsuario(usuario: object) {
    return this.http.post(this.urlApi + 'usuarios/crear', usuario, {headers: this.headers});
  }

  public editarUsuario(usuario: object) {
    return this.http.put(this.urlApi + 'usuarios/editar', usuario, {headers: this.headers});
  }

  public registrarUsuario(usuario: object) {
    return this.http.post(this.urlApi + 'registrarse', usuario);
  }

  public login(usuario: object) {
    return this.http.get(this.urlApi + 'login/' + usuario['documento'] + '/' + usuario['password']);
  }

  public actualizarPerfil(usuario: object) {
    return this.http.put(this.urlApi + 'actualizarDatos', usuario, {headers: this.headers});
  }

  public elminarUsuario(usuario: object) {
    return this.http.put(this.urlApi + 'usuarios/eliminar', usuario, {headers: this.headers});
  }

  public actualizarDatosStorage(usuario: object) {
    localStorage.setItem('nombreCompleto', usuario['nombres'] + ' ' + usuario['apellidos']);
    localStorage.setItem('perfil', usuario['fk_perfil']);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this._perfilMostrar.actualizarDatos(false);
  }

  public validarToken() {
    return this.http.get(this.urlApi + 'validarToken', {headers: this.headers});
  }

  public cerrarSesion() {
    localStorage.clear();
    this._perfilMostrar.actualizarDatos(false);
    this._router.navigate(['']);
  }
}
