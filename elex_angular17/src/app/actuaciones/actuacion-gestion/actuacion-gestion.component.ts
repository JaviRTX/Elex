import { Component, OnInit } from '@angular/core';
import { Actuacion } from '../../models/actuacion.model';
import { ActuacionService } from '../../services/actuacion.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-actuacion-gestion',
  templateUrl: './actuacion-gestion.component.html',
  styleUrls: ['./actuacion-gestion.component.css']
})
export class ActuacionGestionComponent implements OnInit {
  consultaForm: FormGroup;
  actuaciones: Actuacion[] = [];

  constructor(private formBuilder: FormBuilder, private actuacionService: ActuacionService) {
    this.consultaForm = this.formBuilder.group({
      expedienteId: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const expedienteId = this.consultaForm.get('expedienteId')!.value;
    this.cargarActuaciones(expedienteId);
}


  cargarActuaciones(id: number) {
    this.actuacionService.getActuacionesByExpedienteId(id).subscribe(
      (data: Actuacion[]) => {
        this.actuaciones = data;
      },
      (error) => {
        console.error('Error al obtener las actuaciones:', error);
      }
    );
  }
}
