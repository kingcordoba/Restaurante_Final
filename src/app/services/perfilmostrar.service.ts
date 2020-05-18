import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilmostrarService {

  private datos = new Subject<any>();
  public obsDatos = this.datos.asObservable();

  public actualizarDatos(estado: boolean) {
    this.datos.next(estado);
  }
}
