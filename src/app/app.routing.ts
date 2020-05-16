import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebComponent } from './web/web.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './web/notfound/notfound.component';
import { DashboardGuard } from './guards/dashboard.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: '', component: WebComponent, loadChildren: './web/web.module#WebModule'},
  { path: '**', component: WebComponent, children: [
    { path: '', component: NotfoundComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
