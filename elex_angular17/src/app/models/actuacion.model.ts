export class Actuacion {
  public id: number;
  public descripcion: string;
  public finalizado: boolean;
  public fecha: Date;
  public activo: boolean;

  constructor(id: number, descripcion: string, finalizado: boolean, fecha: Date, activo: number) {
    this.id = id;
    this.descripcion = descripcion;
    this.finalizado = finalizado;
    this.fecha = fecha;
    this.activo = activo !== 0; // Convierte 0 a false, cualquier otro número a true
  }

  static filtrarActivas(actuaciones: Actuacion[]): Actuacion[] {
    return actuaciones.filter(actuacion => actuacion.activo);
  }
}
