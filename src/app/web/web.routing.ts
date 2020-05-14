
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlatosComponent } from './platos/platos.component';

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InicioComponent },
    { path: 'index', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'platos', component: PlatosComponent }
  ])],
  exports: [RouterModule]
})
export class WebRoutingModule { }
