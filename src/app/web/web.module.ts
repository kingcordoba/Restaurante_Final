import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlatosComponent } from './platos/platos.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';

import { WebRoutingModule } from './web.routing';
import { WebComponent } from './web.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    NavbarComponent,
    PlatosComponent,
    CarritoCompraComponent
  ],
  providers: []
})
export class WebModule { }
