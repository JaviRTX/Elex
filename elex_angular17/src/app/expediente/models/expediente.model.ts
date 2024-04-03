import { EstadoExpediente } from "./estado-expediente.enum";

export interface Expediente {
  codigo: string;
  fecha: string; // Use a string here, it will be converted to a date on the backend.
  estado: EstadoExpediente; // This should be an enum or string based on your 'EstadoExpediente' definition.
  opciones?: string;
  descripcion: string;
  tipo: number; // Assuming 'Byte' translates to a number in TypeScript.
  activo: boolean;
  // Assuming Actuacion and Documento are nested within Expediente, you'd also define those here.
  actuacion: {
    descripcion: string;
    finalizado: boolean;
    fecha?: string; // Use a string to send dates to the backend.
  };
  documento: {
    ruta: string;
    tasa: number; // You can send it as number and convert to BigDecimal on the backend.
  };
}
