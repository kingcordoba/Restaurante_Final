import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { WebRoutingModule } from './web.routing';
import { PruComponent } from './pru/pru.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    WebRoutingModule
  ],
  declarations: [
    InicioComponent,
    LoginComponent,
    PruComponent,
  ]
})
export class WebModule { }
