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
  actuaciones: Actuacion[] = [];
  actuacionesFiltradas: Actuacion[] = [];
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
      (error: any) => { // Aquí definimos el tipo como 'any'
        console.error('Error al obtener todas las actuaciones:', error);
      }
    );
  }

  onSubmit() {
    const expedienteId = this.consultaForm.get('expedienteId')!.value;
    this.cargarActuaciones(expedienteId);
  }

  cargarActuaciones(id: number) {
    this.actuacionService.getActuacionesByExpedienteId(id).subscribe(
      (data: Actuacion[]) => {
        this.actuaciones = data; // Aquí decides si debes o no filtrar
      },
      (error) => {
        console.error('Error al obtener las actuaciones:', error);
      }
    );
  }

  filtrarActuacionesPorFecha() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.actuacionesFiltradas = [];
      return;
    }

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    this.actuacionesFiltradas = this.actuaciones.filter(actuacion => {
      const fechaActuacion = new Date(actuacion.fecha);
      return fechaActuacion >= inicio && fechaActuacion <= fin;
    });
  }
}
