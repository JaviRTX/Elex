export class Expediente {
  constructor(
      public id: number,
      public codigo: string,
      public fecha: Date,
      public estado: string,
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

  static filtrarActivos(expedientes: Expediente[]): Expediente[] {
      return expedientes.filter(expediente => expediente.activo);
  }
}

