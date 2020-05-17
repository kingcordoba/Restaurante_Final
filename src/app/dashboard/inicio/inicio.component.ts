import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {
    this.appService.pageTitle = 'Dashboard';
  }

  ngOnInit(): void {
  }

}
