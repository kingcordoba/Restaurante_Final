import { Injectable } from '@angular/core';
import { CONFIG } from './configuracion.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  private urlApi: string;
  private headers = new HttpHeaders({
    'Authorization': localStorage.getItem('token'),
    'tokenTime': localStorage.getItem('tiempoToken')
  });

  constructor(private http: HttpClient) {
    this.urlApi = CONFIG.urlAPi;
  }

  obtenerPlatos() {
    return this.http.get(this.urlApi + 'platos/lista');
  }

  agregarPlato(plato: object, editar?, idPlato?) {
    if (editar) {
      console.log('editar');
      plato['idPlato'] = idPlato;
      return this.http.post(this.urlApi + 'platos/editar', plato, { headers: this.headers });
    } else {
      return this.http.post(this.urlApi + 'platos/guardar', plato, { headers: this.headers });
    }
  }

  eliminarPlato(plato: object) {
    return this.http.put(this.urlApi + 'platos/eliminar', plato, { headers: this.headers });
  }

  platoDelDia(plato: object) {
    return this.http.put(this.urlApi + 'platos/dia', plato, { headers: this.headers });
  }

  obtenerPlatosDia() {
    return this.http.get(this.urlApi + 'platos/dia');
  }

  crearPromo(promo: object) {
    return this.http.post(this.urlApi + 'promo/crear', promo, { headers: this.headers });
  }

  quitarPromo(promo: object) {
    return this.http.put(this.urlApi + 'promo/quitar', promo, { headers: this.headers });
  }

  listaPromo() {
    return this.http.get(this.urlApi + 'promo/lista');
  }

  postFileImagen(imagenParaSubir: File, idPlato) {
    const formData = new FormData();
    formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name);
    formData.append('id', idPlato);
    return this.http.post(this.urlApi + 'platos/imagen', formData, { headers: this.headers });
  }

}
