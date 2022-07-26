import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './Opc-Menu/inicio/inicio.component';
import { ProyectosComponent } from './Opc-Menu/proyectos/proyectos.component';
import { E1Component } from './Opc-Menu/e1/e1.component';
import { E2Component } from './Opc-Menu/e2/e2.component';
import { E3Component } from './Opc-Menu/e3/e3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ProyectosComponent,
    E1Component,
    E2Component,
    E3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
