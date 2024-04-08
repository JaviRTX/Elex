import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarExpedienteService {
  private apiUrl = 'http://localhost:8101'; // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient) { }

  updateExpediente(id: number, params: HttpParams): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/expedientes/${id}/actualizar`, null, { params });
  }
}

