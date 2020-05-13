import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ProfileComponent } from './examples/profile/profile.component';

import { InicioComponent } from './web/inicio/inicio.component';
import { LoginComponent } from './web/login/login.component';

const routes: Routes =[
    { path: '', component: InicioComponent},
    { path: 'index',                component: InicioComponent },
    { path: 'login',       component: LoginComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/profile',     component: ProfileComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
