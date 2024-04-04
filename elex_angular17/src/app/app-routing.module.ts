import { ExpedientesComponent } from './expediente/expediente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariosTiposComponent } from './formularios-tipos/formularios-tipos.component'; // Asegúrate de que la ruta sea correcta


const routes: Routes = [
  { path: 'formulario-tipos', component: FormulariosTiposComponent },
  { path: 'expedientes', component: ExpedientesComponent },
  // ... cualquier otra ruta existente ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
