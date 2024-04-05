export class Expediente {
  constructor(
      public id: number,
      public codigo: string,
      public fecha: Date,
      public estado: string, // Ajusta según tu modelo de datos
      public opciones: string,
      public descripcion: string,
      public tipo: number,
      public activo: boolean,
      public descripcionActuacion: string,
      public finalizadoActuacion: boolean,
      public fechaActuacion: Date,
      public rutaDocumento: string,
      public tasaDocumento: number
      // Agrega otros campos necesarios aquí
  ) {}
}
