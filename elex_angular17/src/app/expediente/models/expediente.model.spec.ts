import { EstadoExpediente } from './estado-expediente.enum';

export interface Expediente {
  id?: number; // Optional as it's auto-incremented in the database
  codigo: string;
  fecha: string; // Dates are typically handled as strings in TypeScript and converted as needed
  estado: EstadoExpediente; // Using the enum to restrict to valid states
  opciones?: string;
  descripcion: string;
  tipo: number; // Assuming this correlates to an id in tipos_expediente
  activo: boolean;

  // Include nested objects for actuacion and documento if they are part of Expediente
  actuacion?: {
    descripcion: string;
    finalizado: boolean;
    fecha?: string;
  };
  documento?: {
    ruta: string;
    tasa: number;
  };
}

