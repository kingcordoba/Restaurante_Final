import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {
    this.appService.pageTitle = 'No se ha encontrado';
  }

  ngOnInit(): void {
  }

}
