import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Expediente } from "../models/expediente.model";

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  private apiUrl = 'http://your-backend-url/api/expediente';

  constructor(private http: HttpClient) { }

  createExpediente(expediente: Expediente): Observable<Expediente> {
    // You may need to adjust how you send the data based on the expected backend format.
    const formData: FormData = new FormData();
    formData.append('codigo', expediente.codigo);
    formData.append('fecha', expediente.fecha);
    formData.append('estado', expediente.estado.toString());
    if (expediente.opciones) formData.append('opciones', expediente.opciones);
    formData.append('descripcion', expediente.descripcion);
    formData.append('tipo', expediente.tipo.toString());
    formData.append('activo', expediente.activo.toString());
    // Append actuacion and documento data as well.
    formData.append('descripcionActuacion', expediente.actuacion.descripcion);
    formData.append('finalizadoActuacion', expediente.actuacion.finalizado.toString());
    if (expediente.actuacion.fecha) formData.append('fechaActuacion', expediente.actuacion.fecha);
    formData.append('rutaDocumento', expediente.documento.ruta);
    formData.append('tasaDocumento', expediente.documento.tasa.toString());

    return this.http.post<Expediente>(this.apiUrl, formData);
  }
}
