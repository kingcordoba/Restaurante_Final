import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { InicioComponent } from './inicio/inicio.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    DashboardRoutingModule,
  ],
  declarations: [
    SidebarComponent,
    InicioComponent,
    DashboardComponent,
    FooterComponent,
    NotfoundComponent,
  ]
})
export class DashboardModule { }
