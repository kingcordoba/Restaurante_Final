import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WebRoutingModule } from './web.routing';
import { WebComponent } from './web.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,

    WebRoutingModule
  ],
  declarations: [
    InicioComponent,
    LoginComponent,
    WebComponent,
    NavbarComponent

  ]
})
export class WebModule { }
