// ELEX: SpringBoot3.2 + Angular17.3 -> Paso4: Controlador componente
// Comando: ng generate component formularios-tipos

import { Component, OnInit } from '@angular/core';

// Importaciones propias
import { TiposService } from '../services/tipos.service';
import { Tipos } from '../models/tipos.model';
import Swal from 'sweetalert2';

TiposService

@Component({
  selector: 'app-formularios-tipos',
  // standalone: false,
  templateUrl: './formularios-tipos.component.html',
  styleUrl: './formularios-tipos.component.css'
})

// OJO! Hay que implementar OnInit
export class FormulariosTiposComponent implements OnInit{
  // Atributos generales
  tipos: Tipos[] = []         // Defino array tipos para consulta
  mensaje: string = ""        // Mensaje para el alert

  // Propiedades del formulario
  materia: string = "---"

  // Constructor (inyecto el servicio)
  constructor(private servicio: TiposService) {}

  // Métodos de cargar (consulta) e insertar (inserción)
  cargarTipos(): void {
    this.servicio.consultarTipos().subscribe(datos => {
      // Aquí aplicamos el filtro para solo mostrar los tipos activos
      this.tipos = datos.filter(tipo => tipo.activo);
    });
  }

  insertarTipo(): void {
    this.servicio.insertarTipo(this.materia).subscribe(resultado => {
      if(resultado) {
        this.mensaje = "Tipo insertado"
        this.cargarTipos()
      }
    })
  }

  // Finalmente ponemos el ngOnInit
  ngOnInit(): void {
      this.cargarTipos()
  }

  // ----------------------------------------
  // NUEVO! ACTUALIZAR Y BORRAR
  // Paso2: Modificar controlador (componente)
  // ----------------------------------------

  // Atributo tipo que usamos para actualizar
  tipoParaActualizar: Tipos | null = null;

  actualizarTipoFormulario(): void {
    if (this.tipoParaActualizar && this.materia) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Vas a actualizar el tipo de formulario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          // Uso del operador de afirmación no nula aquí
          this.servicio.actualizarTipo(this.tipoParaActualizar!.id, this.materia).subscribe(resultado => {
            this.mensaje = "Tipo actualizado";
            this.cargarTipos();
            this.tipoParaActualizar = null;
            this.materia = '---';
            Swal.fire(
              'Actualizado',
              'El tipo de formulario ha sido actualizado con éxito.',
              'success'
            );
          }, error => {
            console.error('Error al actualizar el tipo', error);
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el tipo: ' + error.message,
              'error'
            );
          });
        }
      });
    } else {
      console.error('Datos incompletos para la actualización');
      Swal.fire(
        'Error',
        'Datos incompletos para la actualización. Por favor, verifica la información e inténtalo de nuevo.',
        'error'
      );
    }
  }
  prepararActualizacion(tipo: Tipos): void {
    this.tipoParaActualizar = tipo;
    this.materia = tipo.materia;
  }

  cancelarActualizacion(): void {
    this.tipoParaActualizar = null;
    this.materia = '---'; // O el valor por defecto que prefieras
  }

  // Y el borrado...
  borrarTipo(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de querer borrar este tipo?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar el spinner
        Swal.fire({
          title: 'Borrando...',
          timer: 5000,
          willOpen: () => {
            Swal.showLoading();
          },
          didClose: () => {
            // Llamar al servicio que realiza el borrado lógico
            this.servicio.borrarLogicoTipo(id).subscribe(() => {
              this.mensaje = "Tipo borrado lógicamente";
              this.cargarTipos();
            });
          }
        });
      }
    });
  }
}
