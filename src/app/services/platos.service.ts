import { Injectable } from '@angular/core';
import { CONFIG } from './configuracion.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = CONFIG.urlAPi;
  }

  obtenerPlatos() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'platos/lista', { headers });
  }

  agregarPlato(plato: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.post(this.urlApi + 'platos/guardar', plato, { headers });
  }

}
