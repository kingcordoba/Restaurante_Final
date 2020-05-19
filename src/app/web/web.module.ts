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

import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { LoaderModule } from '../shared/loader/loader.module';
import { PedidoComponent } from './pedido/pedido.component';
import { ModalTerminosComponent } from './modal-terminos/modal-terminos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule,
    HttpClientModule,
    LoaderModule,
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
    NotfoundComponent,
    PerfilComponent,
    PedidoComponent,
    ModalTerminosComponent
  ],
  providers: []
})
export class WebModule { }
