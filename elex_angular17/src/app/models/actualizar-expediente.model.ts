export class ActualizarExpediente {
    constructor(
        public id: number,
        public codigo: string,
        public fecha: Date,
        public estado: string,
        public opciones: string,
        public descripcion: string,
        public tipo: number,
        public activo: boolean,
        // Agrega otros campos necesarios aquí
    ) {}
}
