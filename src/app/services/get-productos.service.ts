import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductosService {
  productos: object[] = [];

  private listaProductos = new Subject<any>();
  public obsListaProductos = this.listaProductos.asObservable();

  public agregarCarrito(product: object) {
    this.productos.push(product);
    this.listaProductos.next(this.productos);
    this.saveInStorage();

  }

  constructor() {
    // this.checkearCarrito();
  }

  public aumentaOdisminuir(tipo: number, producto: object) {
    const pos = this.productos.indexOf(producto);
    if (tipo === 1) {
      this.agregarCarrito(this.productos[pos]);
    } else {
      this.productos.splice(pos, 1);
      this.listaProductos.next(this.productos);
      if (this.productos.length === 0) {
        localStorage.removeItem('carrito');
      }
    }

    this.saveInStorage();
  }

  public getList() {
    return this.productos;
  }

  public saveInStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  checkearCarrito() {
    if (localStorage.getItem('carrito')) {
      // this.productos = JSON.parse(localStorage.getItem('carrito'));
      // this.listaProductos.next(this.productos);
      // console.log('full');

      const arraytmp = JSON.parse(localStorage.getItem('carrito'));
      console.log('arraytmp: ', arraytmp);
      arraytmp.forEach(element => {
        this.aumentaOdisminuir(1, element);
      });
    }
  }

  vaciarCarrito() {
    this.productos = [];
    this.listaProductos.next(this.productos);
  }
}
