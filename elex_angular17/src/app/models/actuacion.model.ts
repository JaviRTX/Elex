export class Actuacion {
  public id: number;
  public descripcion: string;
  public finalizado: boolean;
  public fecha: Date;
  public activo: boolean

  constructor(id: number, descripcion: string, finalizado: boolean, fecha: Date, activo: boolean) {
    this.id = id;
    this.descripcion = descripcion;
    this.finalizado = finalizado;
    this.fecha = fecha;
    this.activo = activo; // Directamente asignar el valor booleano
  }

  static filtrarActivas(actuaciones: Actuacion[]): Actuacion[] {
    return actuaciones.filter(actuacion => actuacion.activo);
  }
}
