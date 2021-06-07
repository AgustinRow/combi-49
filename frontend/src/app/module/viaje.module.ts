import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";
import { Usuario } from "./usuario.module";
import { Time } from "@angular/common";

export class Viaje{
    id: number;
    fecha_salida: Date;
    //fecha_llegada: Date;
    hora: Time;
    detalle: string;
    borradoLogico: number;  //activo
    chofer: Usuario;// | Number;
    vehiculo: Vehiculo;
    ruta: Ruta;
}