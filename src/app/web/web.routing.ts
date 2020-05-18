
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlatosComponent } from './platos/platos.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioInactivoGuard } from '../guards/usuario-inactivo.guard';
import { UsuarioActivoGuard } from '../guards/usuario-activo.guard';
import { PedidoComponent } from './pedido/pedido.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InicioComponent },
    { path: 'index', component: InicioComponent },
    { path: 'registro', canActivate: [UsuarioInactivoGuard], component: RegistroComponent },
    { path: 'login', canActivate: [UsuarioInactivoGuard], component: LoginComponent },
    { path: 'platos', component: PlatosComponent },
    { path: 'pedido', component: PedidoComponent},
    { path: 'perfil', canActivate: [UsuarioActivoGuard], component: PerfilComponent},
    { path: '**', component: NotfoundComponent}
  ])],
  exports: [RouterModule]
})
export class WebRoutingModule { }
