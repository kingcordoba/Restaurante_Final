import { Component, OnInit, Renderer2, OnDestroy} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { GetProductosService } from '../../services/get-productos.service';
import { AppService } from '../../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlatosService } from '../../services/platos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss'],
  styles: [`
    ngb-progressbar {
      margin-top: 5rem;
    }
    .not-read {
      filter: blur(2px);
      pointer-events: none;
    }
  `]
})
export class InicioComponent implements OnInit, OnDestroy {

  cargador = false;
  mensajeCargador = 'Cargando';
  listaPlatosDia: Array<object> = [];
  listaPlatosPromo: Array<object> = [];


  fondo: any;
  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;
  date: {year: number, month: number};
  model: NgbDateStruct;
  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  state_icon_primary = true;

  constructor(
    private _productos: GetProductosService,
    config: NgbAccordionConfig,
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private platosService: PlatosService,

  ) {
    this.appService.pageTitle = 'Inicio';
    config.closeOthers = true;
    config.type = 'info';
  }

  addProducto(producto) {
    this._productos.agregarCarrito(producto);
  }

  isWeekend(date: NgbDateStruct) {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
      return date.month !== current.month;
  }

  listarPlatosDia() {
    this.platosService.obtenerPlatosDia().subscribe(platos => {
      if (platos['success']) {
        this.listaPlatosDia = platos['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  listarPlatosPromo() {
    this.platosService.listaPromo().subscribe(platos => {
      console.log(platos)
      if (platos['success']) {
        this.listaPlatosPromo = platos['msj'];
      }
    }, error => {
      console.log('error ', error);
    });
  }

  ngOnInit() {
    this.listarPlatosDia();
    this.listarPlatosPromo();
    this.fondo = this.setFondo();
    const rellaxHeader = new Rellax('.rellax-header');

    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
  }
  ngOnDestroy() {
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  setFondo() {
    const num = Math.floor(Math.random() * 2);
    const fondo = `background-image: url('../../assets/img/fondos/bg${num}.jpg');`;
    return this.sanitizer.bypassSecurityTrustStyle(fondo);
  }
}
