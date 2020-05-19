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

  public listaUsusuario() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'usuarios/lista', { headers });
  }

  public crearUsuario(usuario: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.post(this.urlApi + 'usuarios/crear', usuario, { headers });
  }

  public editarUsuario(usuario: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'usuarios/editar', usuario, { headers });
  }

  public registrarUsuario(usuario: object) {
    return this.http.post(this.urlApi + 'registrarse', usuario);
  }

  public login(usuario: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'login/' + usuario['documento'] + '/' + usuario['password']);
  }

  public actualizarPerfil(usuario: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'actualizarDatos', usuario, { headers });
  }

  public elminarUsuario(usuario: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'usuarios/eliminar', usuario, { headers });
  }

  public actualizarDatosStorage(usuario: object) {
    localStorage.setItem('nombreCompleto', usuario['nombres'] + ' ' + usuario['apellidos']);
    localStorage.setItem('perfil', usuario['fk_perfil']);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this._perfilMostrar.actualizarDatos(false);
  }

  public validarToken() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'validarToken', { headers });
  }

  public listaClientes() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'usuarios/lista/clientes', { headers });
  }

  public listaUsuarios() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'usuarios/lista/usuarios', { headers });
  }

  public listaPermisos(idUsuario) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'usuarios/lista/permisos/' + idUsuario, { headers });
  }

  public actualizarPermiso(usuario, modulo) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    let formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('modulo', modulo);

    return this.http.post(this.urlApi + 'usuarios/actualizar/permiso', formData, { headers });
  }

  public cerrarSesion() {
    localStorage.clear();
    this._perfilMostrar.actualizarDatos(false);
    this._router.navigate(['']);
  }
}
