import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actuacion } from '../../models/actuacion.model';
import { ActuacionService } from '../../services/actuacion.service';
import Swal from 'sweetalert2';

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
    // Mostrar spinner
    Swal.fire({
      title: 'Cargando...',
      text: 'Obteniendo actuaciones por ID.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.actuacionService.getActuacionesByExpedienteId(id).subscribe(
      (data: Actuacion[]) => {
        // Filtrar para mostrar solo actuaciones activas por ID
        this.actuacionesPorId = Actuacion.filtrarActivas(data);

        // Cerrar el spinner
        Swal.close();

        // Confirmación de éxito
        if (this.actuacionesPorId.length > 0) {
          Swal.fire(
            'Actuaciones Cargadas',
            'Las actuaciones han sido cargadas correctamente.',
            'success'
          );
        } else {
          Swal.fire(
            'Sin Resultados',
            'No se encontraron actuaciones activas para este ID.',
            'info'
          );
        }
      },
      (error) => {
        // Cerrar el spinner
        Swal.close();

        console.error('Error al obtener las actuaciones por ID:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al obtener las actuaciones por ID: ' + error.message,
          'error'
        );
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

      Swal.fire({
        title: 'Filtrado Completado',
        text: `Se han encontrado ${this.actuacionesFiltradas.length} actuaciones en el rango de fechas seleccionado.`,
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar las fechas de inicio y fin para filtrar.',
        icon: 'error'
      });
    }
  }

  actualizarActuacion() {
    if (this.actuacionForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar esta actuación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Mostrar spinner
          Swal.fire({
            title: 'Actualizando...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const actuacionData = { ...this.actuacionForm.value };
          actuacionData.activo = actuacionData.activo ?? false;

          this.actuacionService.editarActuacion(actuacionData.id, actuacionData).subscribe({
            next: (actuacionActualizada) => {
              Swal.fire(
                '¡Actualizado!',
                'La actuación ha sido actualizada con éxito.',
                'success'
              );
              // Acciones post actualización
            },
            error: (error) => {
              console.error('Error al actualizar la actuación', error);
              Swal.fire(
                'Error',
                'Hubo un problema al actualizar la actuación: ' + error.message,
                'error'
              );
              // Acciones post error
            }
          });
        }
      });
    } else {
      console.error('El formulario de actuación no es válido');
    }
  }
}
