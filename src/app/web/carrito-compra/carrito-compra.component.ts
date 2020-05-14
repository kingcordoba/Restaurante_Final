import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { GetProductosService } from '../../services/get-productos.service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss']
})
export class CarritoCompraComponent implements OnInit {
  listaProducto : object[] = [];
  newProductos: object[] = [];
  total: number = 0;
  closeResult: string;


  constructor(
    private _productos: GetProductosService, 
    private modalService: NgbModal
  ) {
    this.listarProductosModal();
    this.listraProductos();
  }

  ngOnInit(): void {
  }

  validarProducto(datos){
    const nuevaLista = [];
    let total: number = 0;

    datos.forEach(element => {
      const posicion = nuevaLista.indexOf(element);
      if (posicion === -1) {
        element.cantidad = 1;
        nuevaLista.push(element);
      } else {
        nuevaLista[posicion].cantidad += 1;
      }
    });

    nuevaLista.forEach(element => {
      total += element.precio * element.cantidad;
    });

    this.newProductos = nuevaLista;
    this.total = total;
  }

  listarProductosModal() {
    this._productos.obsListaProductos
    .subscribe(
      (datos) => {
        this.validarProducto(datos);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  aumentaOdisminuir(accion: number, posicion: number){
    this._productos.aumentaOdisminuir(accion, this.newProductos[posicion]);
  }


  open(content) {
    let center, tam;

    if (this.newProductos.length){
      center = false;
      tam = "lg";
    } else {
      center = true;
      tam = "md";
    }

    this.modalService.open(content, { size: tam, centered: center}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  listraProductos() {
    this._productos.obsListaProductos
    .subscribe(
      (datos) => {
        this.listaProducto = datos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
