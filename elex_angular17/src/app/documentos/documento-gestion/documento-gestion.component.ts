import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Documento } from '../../models/documento.model';
import { DocumentoService } from '../../services/documento.service';

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
  this.documentoService.getDocumentosByExpedienteId(expedienteId).subscribe(
    data => {
      // Si 'activo' es booleano
      this.documentos = data.filter(doc => doc.activo);

      // Si 'activo' es un número y quieres filtrar aquellos que no sean 0
      // this.documentos = data.filter(doc => doc.activo !== 0);
    },
    error => console.error('Error al obtener documentos:', error)
  );
}

onSubmitActualizacion() {
  if (this.actualizacionForm.valid) {
    const documentoActualizado: Documento = this.actualizacionForm.value;
    this.documentoService.actualizarDocumento(documentoActualizado.id, documentoActualizado).subscribe({
      next: () => {
        console.log('Documento actualizado con éxito');
        // Otras acciones, como actualizar la lista de documentos
      },
      error: error => console.error('Error al actualizar el documento', error)
    });
  } else {
    console.error('Formulario de actualización no es válido');
  }
}
}
