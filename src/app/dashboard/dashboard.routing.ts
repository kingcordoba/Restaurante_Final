import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PermisosGuard } from '../guards/permisos.guard';


@NgModule({
    imports: [RouterModule.forChild([
      { path: '', component: InicioComponent },
      { path: 'index', component: InicioComponent },
      { path: 'usuarios', canActivate: [PermisosGuard], component: UsuariosComponent },
      { path: '**', component: NotfoundComponent }
    ])],
    exports: [RouterModule]
  })

@NgModule({
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
