import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Layout2Component } from './layout/layout-2/layout-2.component';
import { PruComponent } from './web/pru/pru.component';
import { InicioComponent } from './web/inicio/inicio.component';


const routes: Routes =[
    { path: 'web', component: Layout2Component, pathMatch: 'full', children: [
        { path: '', component: InicioComponent },
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
