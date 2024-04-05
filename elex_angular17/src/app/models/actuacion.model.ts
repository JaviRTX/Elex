export class Actuacion {
  constructor(
      public id: number,
      public descripcion: string,
      public finalizado: boolean,
      public fecha: Date,
      public activo: boolean
  ) { }
}
