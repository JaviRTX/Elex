export class Documento {
  constructor(
    public id: number,
    public ruta: string,
    public tasa: number, // Asegúrate de que el tipo coincida con tu backend
    public activo: boolean,
    // El campo 'expediente' no es necesario si solo estás manejando la relación desde el lado del expediente
  ) {}
}
