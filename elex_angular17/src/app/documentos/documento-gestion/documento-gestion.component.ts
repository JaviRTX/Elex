import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Documento } from '../../models/documento.model';
import { DocumentoService } from '../../services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento-gestion',
  templateUrl: './documento-gestion.component.html',
  styleUrls: ['./documento-gestion.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class DocumentoGestionComponent {
  consultaForm: FormGroup;
  actualizacionForm: FormGroup; // Nuevo formulario para actualización
  documentos: Documento[] = [];

  constructor(private formBuilder: FormBuilder, private documentoService: DocumentoService) {
    this.consultaForm = this.formBuilder.group({
      expedienteId: ['']
    });

    // Inicializar el formulario de actualización
    this.actualizacionForm = this.formBuilder.group({
      id: ['', Validators.required],
      ruta: ['', Validators.required],
      tasa: ['', Validators.required],
      activo: [''] // Aquí puedes incluir validadores si es necesario
    });
  }

  onSubmit() {
    const expedienteId = this.consultaForm.get('expedienteId')!.value;

    // Mostrar spinner
    Swal.fire({
      title: 'Cargando...',
      text: 'Obteniendo documentos del expediente.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.documentoService.getDocumentosByExpedienteId(expedienteId).subscribe(
      data => {
        // Cerrar el spinner
        Swal.close();

        // Filtrar y almacenar los documentos activos
        this.documentos = data.filter(doc => doc.activo);

        // Mostrar un mensaje de éxito con la cantidad de documentos encontrados
        Swal.fire(
          'Documentos Cargados',
          `Se han cargado ${this.documentos.length} documentos del expediente.`,
          'success'
        );
      },
      error => {
        console.error('Error al obtener documentos:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al obtener los documentos: ' + error.message,
          'error'
        );
      }
    );
  }

  onSubmitActualizacion() {
    if (this.actualizacionForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar este documento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          const documentoActualizado: Documento = this.actualizacionForm.value;
          this.documentoService.actualizarDocumento(documentoActualizado.id, documentoActualizado).subscribe({
            next: () => {
              console.log('Documento actualizado con éxito');
              Swal.fire(
                'Actualizado',
                'El documento ha sido actualizado con éxito.',
                'success'
              );
              // Otras acciones, como actualizar la lista de documentos
            },
            error: error => {
              console.error('Error al actualizar el documento', error);
              Swal.fire(
                'Error',
                'Hubo un problema al actualizar el documento: ' + error.message,
                'error'
              );
            }
          });
        }
      });
    } else {
      console.error('Formulario de actualización no es válido');
      Swal.fire(
        'Error',
        'El formulario de actualización no es válido. Por favor, revíselo e inténtelo de nuevo.',
        'error'
      );
    }
  }
}
