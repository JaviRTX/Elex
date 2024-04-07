import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actuacion } from '../../models/actuacion.model';
import { ActuacionService } from '../../services/actuacion.service';

@Component({
  selector: 'app-actuacion-gestion',
  templateUrl: './actuacion-gestion.component.html',
  styleUrls: ['./actuacion-gestion.component.css']
})
export class ActuacionGestionComponent implements OnInit {
  consultaForm: FormGroup;
  actuacionForm: FormGroup; // Añadido
  actuaciones: Actuacion[] = [];
  actuacionesFiltradas: Actuacion[] = [];
  actuacionesPorId: Actuacion[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private formBuilder: FormBuilder, private actuacionService: ActuacionService) {
    this.consultaForm = this.formBuilder.group({
      expedienteId: ['']
    });

    // Añadido: Definición del actuacionForm
    this.actuacionForm = this.formBuilder.group({
      id: ['', Validators.required],
      descripcion: ['', Validators.required],
      finalizado: [false, Validators.required],
      fecha: ['', Validators.required]
      // Agrega otros campos necesarios
    });
  }

  ngOnInit(): void {
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

  actualizarActuacion() {
    if (this.actuacionForm.valid) {
      // Crear una copia del valor del formulario
      const actuacionData = { ...this.actuacionForm.value };

      // Asegurarse de que el campo 'activo' tenga un valor booleano
      // Si es undefined o null, se fuerza a false
      actuacionData.activo = actuacionData.activo ?? false;

      this.actuacionService.editarActuacion(actuacionData.id, actuacionData).subscribe({
        next: (actuacionActualizada) => {
          console.log('Actuación actualizada', actuacionActualizada);
          // Acciones post actualización
        },
        error: (error) => {
          console.error('Error al actualizar la actuación', error);
          // Acciones post error
        }
      });
    } else {
      console.error('El formulario de actuación no es válido');
    }
  }
}
