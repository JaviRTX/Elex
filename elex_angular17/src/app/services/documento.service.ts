import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private apiBaseUrl = 'http://localhost:8101'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  getDocumentosByExpedienteId(id: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.apiBaseUrl}/api/expedientes/${id}/de-expendiente-por-documentos`);
  }

  // ...otros métodos...
}
