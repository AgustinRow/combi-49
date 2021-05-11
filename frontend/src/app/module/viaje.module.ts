import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";

export class Viaje{
    id: number;
    fechaSalida: Date;
    fechaLlegada: Date;
    detalle: string;
    borradoLogico: number;  //activo
    chofer: string; //Usuario; <- corregir en app-viaje
    vehiculo: string //Vehiculo; <- corregir en app-viaje
    ruta: string //Ruta; <- corregir en app-viaje
}