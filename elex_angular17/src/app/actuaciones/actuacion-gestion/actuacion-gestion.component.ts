import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Actuacion } from '../../models/actuacion.model';
import { ActuacionService } from '../../services/actuacion.service';

@Component({
  selector: 'app-actuacion-gestion',
  templateUrl: './actuacion-gestion.component.html',
  styleUrls: ['./actuacion-gestion.component.css']
})
export class ActuacionGestionComponent implements OnInit {
  consultaForm: FormGroup;
  actuaciones: Actuacion[] = []; // Todas las actuaciones cargadas por el GET
  actuacionesFiltradas: Actuacion[] = []; // Actuaciones filtradas por fecha
  actuacionesPorId: Actuacion[] = []; // Actuaciones filtradas por ID
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private formBuilder: FormBuilder, private actuacionService: ActuacionService) {
    this.consultaForm = this.formBuilder.group({
      expedienteId: ['']
    });
  }
  ngOnInit(): void {
    // Cargar todas las actuaciones inicialmente o según se requiera
    this.cargarTodasLasActuaciones();
  }

  cargarTodasLasActuaciones() {
    this.actuacionService.getAllActuaciones().subscribe(
      (data: Actuacion[]) => {
        this.actuaciones = data;
      },
      (error) => {
        console.error('Error al obtener todas las actuaciones:', error);
      }
    );
  }

  onSubmit() {
    const expedienteId = this.consultaForm.get('expedienteId')!.value;
    if (expedienteId) {
      this.cargarActuacionesPorId(expedienteId);
    }
  }

  cargarActuacionesPorId(id: number) {
    this.actuacionService.getActuacionesByExpedienteId(id).subscribe(
      (data: Actuacion[]) => {
        // Filtrar para mostrar solo actuaciones activas por ID
        this.actuacionesPorId = Actuacion.filtrarActivas(data);
        // Si necesitas resetear las actuaciones filtradas por fecha puedes descomentar la siguiente línea
        // this.actuacionesFiltradas = [];
      },
      (error) => {
        console.error('Error al obtener las actuaciones por ID:', error);
      }
    );
  }

  filtrarActuacionesPorFecha() {
    if (this.fechaInicio && this.fechaFin) {
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);

      this.actuacionesFiltradas = this.actuaciones.filter(actuacion => {
        const fechaActuacion = new Date(actuacion.fecha);
        return fechaActuacion >= inicio && fechaActuacion <= fin && actuacion.activo;
      });
      // Si necesitas resetear las actuaciones filtradas por ID puedes descomentar la siguiente línea
      // this.actuacionesPorId = [];
    }
  }
}
