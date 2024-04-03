import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpedienteService } from './services/expediente.service';
import { EstadoExpediente } from './models/estado-expediente.enum';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  // styleUrls: ['./expediente.component.css'] (uncomment if you have a stylesheet)
})
export class ExpedienteComponent implements OnInit {
  expedienteForm!: FormGroup;
  estadoExpedienteOptions = Object.values(EstadoExpediente); // If using enum

  constructor(
    private formBuilder: FormBuilder,
    private expedienteService: ExpedienteService
  ) {}

  ngOnInit() {
    this.expedienteForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: [EstadoExpediente.Pendiente, Validators.required], // Set default value
      descripcion: ['', Validators.required],
      tipo: [0, Validators.required],
      activo: [true],
      actuacion: this.formBuilder.group({
        descripcion: [''],
        finalizado: [false],
        fecha: ['']
      }),
      documento: this.formBuilder.group({
        ruta: [''],
        tasa: [0]
      })
    });
  }

  onSubmit(): void {
    if (this.expedienteForm.valid) {
      this.expedienteService.createExpediente(this.expedienteForm.value).subscribe({
        next: (expediente) => {
          console.log('Expediente created successfully', expediente);
          // Handle successful creation
        },
        error: (error) => {
          console.error('Error creating expediente', error);
          // Handle errors here
        }
      });
    }
  }
}
