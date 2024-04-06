import { Expediente } from '../models/expediente.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  private apiUrl = 'http://localhost:8101/api/expedientes/';

  constructor(private http: HttpClient) { }

  createExpediente(expediente: Expediente): Observable<Expediente> {
     // Convertir las fechas de string a Date
    let fechaFormatted = expediente.fecha ? new Date(expediente.fecha).toISOString().split('T')[0] : '';
    let fechaActuacionFormatted = expediente.fechaActuacion ? new Date(expediente.fechaActuacion).toISOString().split('T')[0] : '';
    let params = new HttpParams()
      .set('codigo', expediente.codigo)
      .set('fecha', fechaFormatted) // Formato 'YYYY-MM-DD'
      .set('estado', expediente.estado) // Esto debería ser un string, verifica la representación del enum
      .set('opciones', expediente.opciones || '') // Uso del operador '||' para manejar valores nulos
      .set('descripcion', expediente.descripcion)
      .set('tipo', expediente.tipo.toString()) // Asegurarse de convertir a string si es necesario
      .set('activo', expediente.activo.toString())
      .set('descripcionActuacion', expediente.descripcionActuacion)
      .set('finalizadoActuacion', expediente.finalizadoActuacion.toString())
      .set('fechaActuacion', fechaActuacionFormatted)
      .set('rutaDocumento', expediente.rutaDocumento)
      .set('tasaDocumento', expediente.tasaDocumento.toString()); // Convertir a string

    return this.http.post<Expediente>(`${this.apiUrl}insertar`, params);
  }

  consultarExpedientes(): Observable<Expediente[]> {
    return this.http.get<Expediente[]>(this.apiUrl + 'consultar');
  }

  getExpedienteByCodigo(codigo: string): Observable<Expediente> {
    return this.http.get<Expediente>(`${this.apiUrl}id-por-codigo/${codigo}`);
  }

  borrarLogico(expedienteId: number): Observable<Expediente> {
    const url = `${this.apiUrl}/borrar/{Id}`;
    return this.http.put<Expediente>(url, {});
  }
  // Añade métodos para GET, PUT, DELETE según sea necesario
}
