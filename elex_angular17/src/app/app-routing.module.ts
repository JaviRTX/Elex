import { ExpedientesComponent } from './expediente/expediente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariosTiposComponent } from './formularios-tipos/formularios-tipos.component'; // Asegúrate de que la ruta sea correcta
import { ActuacionGestionComponent } from './actuaciones/actuacion-gestion/actuacion-gestion.component';
import { DocumentoGestionComponent } from './documentos/documento-gestion/documento-gestion.component';


const routes: Routes = [
  { path: 'formulario-tipos', component: FormulariosTiposComponent },
  { path: 'expedientes', component: ExpedientesComponent },
  { path: 'gestion-actuaciones', component: ActuacionGestionComponent },
  { path: 'gestion-documentos', component: DocumentoGestionComponent },
  // ... cualquier otra ruta existente ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
