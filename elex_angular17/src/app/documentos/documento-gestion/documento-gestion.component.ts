import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Documento } from '../../models/documento.model';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-documento-gestion',
  templateUrl: './documento-gestion.component.html',
  styleUrl: './documento-gestion.component.css'
})
export class DocumentoGestionComponent {
  consultaForm: FormGroup;
documentos: Documento[] = [];

constructor(private formBuilder: FormBuilder, private documentoService: DocumentoService) {
  this.consultaForm = this.formBuilder.group({
    expedienteId: ['']
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


}
