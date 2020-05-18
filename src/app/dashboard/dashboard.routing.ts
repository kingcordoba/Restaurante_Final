import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PermisosGuard } from '../guards/permisos.guard';
import { PlatosComponent } from './platos/platos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioActivoGuard } from '../guards/usuario-activo.guard';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
    imports: [RouterModule.forChild([
      { path: '', component: InicioComponent },
      { path: 'index', component: InicioComponent },
      { path: 'usuarios', canActivate: [PermisosGuard], component: UsuariosComponent },
      { path: 'platos', canActivate: [PermisosGuard], component: PlatosComponent },
      { path: 'perfil', canActivate: [UsuarioActivoGuard], component: PerfilComponent },
      { path: 'pedidos', canActivate: [UsuarioActivoGuard], component: PedidosComponent },
      { path: '**', component: NotfoundComponent }
    ])],
    exports: [RouterModule]
  })

@NgModule({
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
