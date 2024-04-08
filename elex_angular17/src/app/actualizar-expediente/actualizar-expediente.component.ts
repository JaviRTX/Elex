import { Component } from '@angular/core';
import { ActualizarExpedienteService } from '../services/actualizar-expediente.service';

@Component({
  selector: 'app-actualizar-expediente',
  templateUrl: './actualizar-expediente.component.html',
  styleUrls: ['./actualizar-expediente.component.css']
})
export class ActualizarExpedienteComponent {
  expedienteModel = {
    id: -1, // Asegúrate de incluir un campo para el ID en el formulario
    codigo: '',
    fecha: null, // Asegúrate de que la fecha sea una cadena en formato ISO, ej. '2024-04-08'
    estado: null,
    opciones: '',
    descripcion: '',
    tipo: null,
    activo: false
  };

  constructor(private actualizarExpedienteService: ActualizarExpedienteService) { }

  actualizarExpediente(): void {
    // Utiliza el valor de id directamente desde el modelo del formulario
    this.actualizarExpedienteService.updateExpediente(this.expedienteModel.id, this.expedienteModel).subscribe({
      next: (expedienteActualizado: any) => {
        console.log('Expediente actualizado:', expedienteActualizado);
      },
      error: (error: any) => {
        console.error('Error al actualizar el expediente:', error);
      }
    });
  }
}
