//ELEX: SpringBoot3.2 + Angular17.3 -> Paso5: Controlador componente GENERAL

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulariosTiposComponent } from './formularios-tipos/formularios-tipos.component';


// Hay que añadir estos componentes de Librerias Angular
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpedientesComponent } from './expediente/expediente.component'; // Asegúrate de que esta ruta sea correcta
import { ReactiveFormsModule } from '@angular/forms';
import { ActuacionGestionComponent } from './actuaciones/actuacion-gestion/actuacion-gestion.component';
import { DocumentoGestionComponent } from './documentos/documento-gestion/documento-gestion.component';
import { ActualizarExpedienteComponent } from './actualizar-expediente/actualizar-expediente.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulariosTiposComponent,
    ExpedientesComponent,
    ActuacionGestionComponent,
    DocumentoGestionComponent,
    ActualizarExpedienteComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // o ReactiveFormsModule si estás utilizando formularios reactivos
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
