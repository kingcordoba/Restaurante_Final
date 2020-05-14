import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';

@NgModule({
    imports: [RouterModule.forChild([
      { path: '', component: InicioComponent },
      { path: 'index', component: InicioComponent }
    ])],
    exports: [RouterModule]
  })

@NgModule({
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
