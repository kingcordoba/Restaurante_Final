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
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule
  ],
  declarations: [
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    WebComponent,
    NavbarComponent,
    PlatosComponent,
    CarritoCompraComponent,
    FooterComponent,
    NotfoundComponent
  ],
  providers: []
})
export class WebModule { }
