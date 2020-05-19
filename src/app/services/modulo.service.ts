import { Injectable } from '@angular/core';
import { CONFIG } from './configuracion.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private urlApi: string;

  constructor(
    private http: HttpClient,
  ) {
    this.urlApi = CONFIG.urlAPi;
  }

  public listaModulosUsuario() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'listaModulosUsuario/' + localStorage.getItem('id'), { headers });
  }

  public validarPermiso(modulo: string) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'permisos/validar/' + localStorage.getItem('id') + '/' + modulo, { headers });
  }
}
