import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";

export class Viaje{
    idViaje: number;
    fechaSalida: Date;
    fechaLlegada: Date;
    detalle: string;
    borradoLogico: number;  //activo
    vehiculo: Vehiculo;
    ruta: Ruta;
}