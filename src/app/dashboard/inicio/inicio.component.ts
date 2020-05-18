import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UsuariosService } from '../../services/usuarios.service';
import { PlatosService } from '../../services/platos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  titulo;
  listaClientes: Array<object> = [];
  listaUsuarios: Array<object> = [];
  listaPlatos: Array<object> = [];
  listaPromo: Array<object> = [];
  listaDia: Array<object> = [];

  constructor(
    private appService: AppService,
    private _usuarios: UsuariosService,
    private _platos: PlatosService
  ) {
    this.titulo = this.appService.pageTitle = 'Dashboard';
  }

  ngOnInit(): void {
    this.listarClientes();
    this.listarUsuarios();
    this.listarPlatos();
    this.listarPromociones();
    this.listarDia();
  }

  listarClientes() {
    this._usuarios.listaClientes()
    .subscribe(result => {
      if (result['success']) {
        this.listaClientes = result['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  listarUsuarios() {
    this._usuarios.listaUsuarios()
    .subscribe(result => {
      if (result['success']) {
        this.listaUsuarios = result['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  listarPlatos() {
    this._platos.obtenerPlatos()
    .subscribe(result => {
      if (result['success']) {
        this.listaPlatos = result['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  listarPromociones() {
    this._platos.listaPromo()
    .subscribe(result => {
      if (result['success']) {
        this.listaPromo = result['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  listarDia() {
    this._platos.obtenerPlatosDia()
    .subscribe(result => {
      if (result['success']) {
        this.listaDia = result['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }


}
