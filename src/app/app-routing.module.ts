import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Opc-Menu/inicio/inicio.component';
import { ProyectosComponent } from './Opc-Menu/proyectos/proyectos.component';
import { E1Component } from './Opc-Menu/e1/e1.component';
import { E2Component } from './Opc-Menu/e2/e2.component';
import { E3Component } from './Opc-Menu/e3/e3.component';

const routes: Routes = [
  {path: "",pathMatch:"full", redirectTo:"Inicio"},
  {path:'Inicio',component:InicioComponent},
  {path:'proyectos',component:ProyectosComponent},
  {path:'E1',component:E1Component},
  {path:'E2',component:E2Component},
  {path:'E3',component:E3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
