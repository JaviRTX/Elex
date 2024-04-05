import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actuacion } from '../models/actuacion.model';

@Injectable({
  providedIn: 'root'
})
export class ActuacionService {
  private apiUrl = 'http://localhost:8101'; // Ajusta a la URL base de tu API

  constructor(private http: HttpClient) { }

  getActuacionesByExpedienteId(id: number): Observable<Actuacion[]> {
    return this.http.get<Actuacion[]>(`${this.apiUrl}/api/expedientes/${id}/de-expendiente-por-actuaciones`);
  }

  getAllActuaciones(): Observable<Actuacion[]> {
    return this.http.get<Actuacion[]>(`${this.apiUrl}/actuaciones/consultar`); // Ajusta la URL según tu back-end
  }
}
