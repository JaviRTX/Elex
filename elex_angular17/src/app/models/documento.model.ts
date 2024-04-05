export class Documento {
  constructor(
    public id: number,
    public ruta: string,
    public tasa: number,
    public activo: boolean
  ) {}

  static filtrarActivos(documentos: Documento[]): Documento[] {
    return documentos.filter(documento => documento.activo);
  }
}
