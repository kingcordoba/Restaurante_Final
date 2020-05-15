
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlatosComponent } from './platos/platos.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistroComponent } from './registro/registro.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InicioComponent },
    { path: 'index', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'platos', component: PlatosComponent },
    { path: '**', component: NotfoundComponent}
  ])],
  exports: [RouterModule]
})
export class WebRoutingModule { }
