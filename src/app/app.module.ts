import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { WebModule } from './web/web.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        NgbModule,

        AppRoutingModule,
        WebModule,
        DashboardModule,
    ],
    providers: [
        Title
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
