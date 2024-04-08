import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpedienteService } from '../services/expediente.service';
import { Expediente } from '../models/expediente.model';
@Component({
  selector: 'app-expedientes',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedientesComponent implements OnInit {
  expedienteForm: FormGroup;
  busquedaForm: FormGroup;
  expedientes: Expediente[] = [];
  expedienteEncontrado: Expediente | null = null;
  mostrarPutModalExpediente: boolean = false;
  expedienteSeleccionadoParaActualizar: Expediente | null = null;

  constructor(private formBuilder: FormBuilder, private expedienteService: ExpedienteService) {
    this.expedienteForm = this.formBuilder.group({
      codigo: [''],
      fecha: [''],
      estado: [''],
      opciones: [''],
      descripcion: [''],
      tipo: [''],
      activo: [''],
      descripcionActuacion: [''],
      finalizadoActuacion: [''],
      fechaActuacion: [''],
      rutaDocumento: [''],
      tasaDocumento: ['']
    });

    this.busquedaForm = this.formBuilder.group({
      codigo: ['']
    });
  }

  ngOnInit(): void {
    this.consultarExpedientes();
    // Puedes añadir más lógica aquí si es necesario
  }
  onSubmit(): void {
    // Asegúrate de que el modelo Expediente acepta exactamente estos campos y en este orden
    const expediente = new Expediente(
      this.expedienteForm.value.id,
      this.expedienteForm.value.codigo,
      this.expedienteForm.value.fecha,
      this.expedienteForm.value.estado,
      this.expedienteForm.value.opciones,
      this.expedienteForm.value.descripcion,
      this.expedienteForm.value.tipo,
      this.expedienteForm.value.activo,
      this.expedienteForm.value.descripcionActuacion,
      this.expedienteForm.value.finalizadoActuacion,
      this.expedienteForm.value.fechaActuacion,
      this.expedienteForm.value.rutaDocumento,
      this.expedienteForm.value.tasaDocumento
    );
    this.expedienteService.createExpediente(expediente).subscribe(result => {
      console.log('Expediente creado:', result);
    }, error => {
      console.error('Error al crear el expediente:', error);
    });
  }
  consultarExpedientes(): void {
    this.expedienteService.consultarExpedientes().subscribe(expedientes => {
      // Filtra para mostrar solo expedientes activos
      this.expedientes = expedientes.filter(expediente => expediente.activo);
    }, error => {
      console.error('Error al consultar los expedientes:', error);
    });
  }
  buscarExpediente(): void {
    if (this.busquedaForm.valid) {
      const codigo = this.busquedaForm.get('codigo')?.value;
      if (codigo) {
        this.expedienteService.getExpedienteByCodigo(codigo).subscribe(
          expediente => {
            // Verificar si el expediente está activo
            if (expediente && expediente.activo) {
              this.expedienteEncontrado = expediente;
            } else {
              console.error('El expediente encontrado no está activo o no existe');
              this.expedienteEncontrado = null;
            }
          },
          error => {
            console.error('Error al buscar expediente:', error);
            this.expedienteEncontrado = null;
          }
        );
      } else {
        console.error('El código de expediente está vacío');
      }
    } else {
      console.error('Formulario de búsqueda no es válido');
    }
  }

  borrarLogico(expedienteId: number): void {
    this.expedienteService.borrarLogico(expedienteId).subscribe(
      (expedienteActualizado) => {
        console.log('Expediente borrado lógicamente:', expedienteActualizado);
        // Puedes actualizar la lista de expedientes o realizar otras acciones
        this.consultarExpedientes();
      },
      (error) => {
        console.error('Error al borrar el expediente:', error);
      }
    );
}

mostrarModal: boolean = false;

abrirModal(): void {
  this.mostrarModal = true;
}

cerrarModal(): void {
  this.mostrarModal = false;
}

}
