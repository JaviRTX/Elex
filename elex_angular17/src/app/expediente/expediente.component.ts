import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ExpedienteService } from '../services/expediente.service';
import { Expediente } from '../models/expediente.model';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedientesComponent implements OnInit {
  // Inicialización directa
  expedienteForm: FormGroup = this.formBuilder.group({
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
    // Agrega controles de formulario para otros campos
  });
  expedientes: Expediente[] = []; // Propiedad para almacenar los expedientes consultados

  constructor(
    private formBuilder: FormBuilder,
    private expedienteService: ExpedienteService
  ) {}

  ngOnInit(): void {
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
      // Agrega controles de formulario para otros campos
    });
  }

  onSubmit(): void {
    const expediente = new Expediente(
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
      // Aquí podrías, por ejemplo, limpiar el formulario o mostrar un mensaje de éxito
    }, error => {
      console.error('Error al crear el expediente:', error);
      // Aquí manejarías los errores, como mostrar un mensaje de error
    });
  }

  consultarExpedientes(): void {
    this.expedienteService.consultarExpedientes().subscribe(expedientes => {
      this.expedientes = expedientes;
      // Procesa aquí los expedientes consultados
    }, error => {
      console.error('Error al consultar los expedientes:', error);
    });
  }
}
