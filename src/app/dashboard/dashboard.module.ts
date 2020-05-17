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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { PlatosComponent } from './platos/platos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../shared/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    DashboardRoutingModule,

    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule
  ],
  declarations: [
    SidebarComponent,
    InicioComponent,
    DashboardComponent,
    FooterComponent,
    NotfoundComponent,
    UsuariosComponent,
    PlatosComponent,
  ]
})
export class DashboardModule { }
