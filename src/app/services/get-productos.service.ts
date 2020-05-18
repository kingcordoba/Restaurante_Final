import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductosService {
  productos : object[] = [];

  productosMostrar:Array<Object> = [
    { 
      id: 1,
      nombre: 'Hamburguesa',
      descripcion: 'El super combo con papas.',
      img: '../../../assets/img/productos/01.jpg',
      precio: 10500,
    },
    {
      id: 2,
      nombre: 'Nugets',
      descripcion: 'Con papitas y bien fritas.',
      img: '../../../assets/img/productos/02.jpg',
      precio: 6500,
    },
    {
      id: 3,
      nombre: 'Carnita de patico',
      descripcion: 'Te va dar pesar comertelo.',
      img: '../../../assets/img/productos/03.jpg',
      precio: 15500,
    },
    {
      id: 4,
      nombre: 'Sancochito',
      descripcion: 'Delicioso muy delicoso.',
      img: '../../../assets/img/productos/04.jpg',
      precio: 16500,
    },
    {
      id: 5,
      nombre: 'Salchicha',
      descripcion: 'En forma de corazón.',
      img: '../../../assets/img/productos/05.jpg',
      precio: 3500,
    },
    {
      id: 6,
      nombre: 'Pizza',
      descripcion: 'Para que te la comas toda todita.',
      img: '../../../assets/img/productos/06.jpg',
      precio: 4500,
    }
  ];

  private listaProductos = new Subject<any>();
  public obsListaProductos = this.listaProductos.asObservable();

  public agregarCarrito(product: object){
    this.productos.push(product);
    this.listaProductos.next(this.productos);
    this.saveInStorage();

  }

  constructor(){
    // this.checkearCarrito();
  }

  public aumentaOdisminuir(tipo: number, producto: object){
    const pos = this.productos.indexOf(producto);
    if (tipo === 1) {
      this.agregarCarrito(this.productos[pos]);
    } else {
      this.productos.splice(pos, 1);
      this.listaProductos.next(this.productos);
      if(this.productos.length == 0){
        localStorage.removeItem('carrito');
      }
    }

    this.saveInStorage();
  }

  public getList(){
    return this.productos;
  }

  public saveInStorage(){
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  checkearCarrito(){
    if(localStorage.getItem('carrito')){
      // this.productos = JSON.parse(localStorage.getItem('carrito'));
      // this.listaProductos.next(this.productos);
      // console.log('full');

      let arraytmp = JSON.parse(localStorage.getItem('carrito'));
      console.log('arraytmp: ',arraytmp);
      arraytmp.forEach(element => {
        this.aumentaOdisminuir(1,element);
      });
    }
  }
}
