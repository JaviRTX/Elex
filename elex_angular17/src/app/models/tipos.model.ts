// ELEX: SpringBoot3.2 + Angular17.3 -> Paso2: Modelo (interfaz)
// Comando: ng generate class models/tipos --type=model

export interface Tipos {
  id: number;
  materia: string;
  // Suponiendo que hay un campo 'activo'
  activo: number;
}

export class TiposFiltrado {
  static filtrarActivos(tipos: Tipos[]): Tipos[] {
      return tipos.filter(tipo => tipo.activo !== 0);
  }
}
