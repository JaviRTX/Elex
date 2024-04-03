import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpedienteComponent } from './expediente.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ExpedienteComponent],
  exports: [ExpedienteComponent],
})
export class ExpedienteModule {}
