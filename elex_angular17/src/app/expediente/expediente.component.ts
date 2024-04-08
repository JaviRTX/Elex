import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpedienteService } from '../services/expediente.service';
import { Expediente } from '../models/expediente.model';
import Swal from 'sweetalert2';
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
 
  }
  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de crear un nuevo expediente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crearlo'
    }).then((result) => {
      if (result.isConfirmed) {
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
      Swal.fire(
        '¡Creado!',
        'El expediente ha sido creado con éxito.',
        'success'
      );
    }, error => {
      Swal.fire(
        'Error',
        'Hubo un problema al crear el expediente: ' + error.message,
        'error'
      );
    });
  }
});
}
consultarExpedientes(): void {
  this.expedienteService.consultarExpedientes().subscribe(
    expedientes => {
      this.expedientes = expedientes.filter(expediente => expediente.activo);

      // Mostrar confirmación
      Swal.fire({
        title: 'Expedientes Consultados',
        text: 'Los expedientes activos han sido cargados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    },
    error => {
      console.error('Error al consultar los expedientes:', error);
    }
  );
}

  buscarExpediente(): void {
  if (this.busquedaForm.valid) {
    const codigo = this.busquedaForm.get('codigo')?.value;
    if (codigo) {
      this.expedienteService.getExpedienteByCodigo(codigo).subscribe(
        expediente => {
          if (expediente && expediente.activo) {
            this.expedienteEncontrado = expediente;
            Swal.fire({
              title: 'Expediente Encontrado',
              html: `

                <strong>Id:</strong> ${expediente.id}<br>
                <strong>Código:</strong> ${expediente.codigo}<br>
                <strong>Fecha:</strong> ${expediente.fecha}<br>
                <strong>Estado:</strong> ${expediente.estado}<br>
                <strong>Descripción:</strong> ${expediente.descripcion}<br>
                <!-- más campos según necesites -->
              `,
              icon: 'success'
            });
          } else {
            Swal.fire('No Encontrado', 'El expediente encontrado no está activo o no existe', 'error');
            this.expedienteEncontrado = null;
          }
        },
        error => {
          Swal.fire('Error', 'Error al buscar expediente: ' + error.message, 'error');
          this.expedienteEncontrado = null;
        }
      );
    } else {
      Swal.fire('Error', 'El código de expediente está vacío', 'error');
    }
  } else {
    Swal.fire('Error', 'Formulario de búsqueda no es válido', 'error');
  }
}

borrarLogico(expedienteId: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'El expediente será borrado lógicamente',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, bórralo'
  }).then((result) => {
    if (result.isConfirmed) {
      // Mostrar spinner
      Swal.fire({
        title: 'Borrando...',
        text: 'Por favor, espera.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.expedienteService.borrarLogico(expedienteId).subscribe(
        (expedienteActualizado) => {
          // Cerrar el spinner
          Swal.close();

          console.log('Expediente borrado lógicamente:', expedienteActualizado);
          Swal.fire(
            '¡Borrado!',
            'El expediente ha sido borrado lógicamente.',
            'success'
          );
          this.consultarExpedientes();
        },
        (error) => {
          console.error('Error al borrar el expediente:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al borrar el expediente: ' + error.message,
            'error'
          );
        }
      );
    }
  });
}

mostrarModal: boolean = false;

abrirModal(): void {
  this.mostrarModal = true;
}

cerrarModal(): void {
  this.mostrarModal = false;
}

}
