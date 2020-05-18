import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  titulo;

  constructor(
    private appService: AppService
  ) {
    this.titulo = this.appService.pageTitle = 'Dashboard';
  }

  ngOnInit(): void {
  }

}
