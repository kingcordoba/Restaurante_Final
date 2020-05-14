import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebComponent } from './web/web.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes =[
    { path: '', component: WebComponent, loadChildren: './web/web.module#WebModule'},
    { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
