import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = CONFIG.urlAPi;
  }

  public registrarUsuario(usuario: object){
    const headers = new HttpHeaders({
      'Authorization': 'funca'
    });
    return this.http.post(this.urlApi + 'registrarse', usuario, {headers});
  }
}
