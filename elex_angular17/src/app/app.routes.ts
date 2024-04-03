// Other imports...
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteComponent } from './expediente/expediente.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // ... other route definitions
  { path: 'expediente', component: ExpedienteComponent },
  // Redirect any unknown URLs to home page (you might already have this line)
  { path: '', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
