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
  // Usando '!' para asegurarnos de que 'expedienteId' no es nulo
  const expedienteId = this.consultaForm.get('expedienteId')!.value;
  this.documentoService.getDocumentosByExpedienteId(expedienteId).subscribe(
    data => this.documentos = data,
    error => console.error(error)
  );
}

}
