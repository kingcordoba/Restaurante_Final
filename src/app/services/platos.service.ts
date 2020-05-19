import { Injectable } from '@angular/core';
import { CONFIG } from './configuracion.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = CONFIG.urlAPi;
  }

  obtenerPlatos() {
    return this.http.get(this.urlApi + 'platos/lista');
  }

  agregarPlato(plato: object, editar?, idPlato?) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    if (editar) {
      console.log('editar');
      plato['idPlato'] = idPlato;
      return this.http.post(this.urlApi + 'platos/editar', plato, { headers });
    } else {
      return this.http.post(this.urlApi + 'platos/guardar', plato, { headers });
    }
  }

  eliminarPlato(plato: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'platos/eliminar', plato, { headers });
  }

  platoDelDia(plato: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'platos/dia', plato, { headers });
  }

  obtenerPlatosDia() {
    return this.http.get(this.urlApi + 'platos/dia');
  }

  crearPromo(promo: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.post(this.urlApi + 'promo/crear', promo, { headers });
  }

  quitarPromo(promo: object) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'promo/quitar', promo, { headers });
  }

  listaPromo() {
    return this.http.get(this.urlApi + 'promo/lista');
  }

  postFileImagen(imagenParaSubir: File, idPlato) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    const formData = new FormData();
    formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name);
    formData.append('id', idPlato);
    return this.http.post(this.urlApi + 'platos/imagen', formData, { headers });
  }

  realizarPedido(pedido: object) {
    return this.http.post(this.urlApi + 'pedidos/crear', pedido);
  }

  listaPedidos() {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'pedidos/lista', { headers });
  }

  detallesPedido(idPedido) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.get(this.urlApi + 'pedidos/detalle/' + idPedido, { headers });
  }

  estadoPedido(idPedido) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'tokenTime': localStorage.getItem('tiempoToken')
    });
    return this.http.put(this.urlApi + 'pedidos/completo', idPedido, { headers });
  }

}
