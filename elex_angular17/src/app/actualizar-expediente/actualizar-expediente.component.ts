import { Component } from '@angular/core';
import { ActualizarExpedienteService } from '../services/actualizar-expediente.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-expediente',
  templateUrl: './actualizar-expediente.component.html',
  styleUrls: ['./actualizar-expediente.component.css']
})
export class ActualizarExpedienteComponent {
  expedienteModel = {
    id: 1, // Valor inicial que indica un ID no válido o no establecido
    codigo: '',
    fecha: '', // Fecha como cadena, inicializada vacía
    estado: '', // Inicializa con un valor por defecto si es necesario
    opciones: '',
    descripcion: '',
    tipo: 1, // Valor numérico inicial, ajusta según tu lógica
    activo: true,
  };

  constructor(private http: HttpClient, private actualizarExpedienteService: ActualizarExpedienteService) { }

  actualizarExpediente(): void {
    const params = new HttpParams()
      .set('codigo', this.expedienteModel.codigo)
      .set('fecha', this.expedienteModel.fecha ? this.expedienteModel.fecha.toString() : '')
      .set('estado', this.expedienteModel.estado)
      .set('opciones', this.expedienteModel.opciones || '')
      .set('descripcion', this.expedienteModel.descripcion)
      .set('tipo', this.expedienteModel.tipo ? this.expedienteModel.tipo.toString() : '')
      .set('activo', this.expedienteModel.activo.toString());

    this.actualizarExpedienteService.updateExpediente(this.expedienteModel.id, params).subscribe({
      next: (expedienteActualizado: any) => {
        console.log('Expediente actualizado:', expedienteActualizado);
      },
      error: (error: any) => {
        console.error('Error al actualizar el expediente:', error);
      }
    });
  }
}
