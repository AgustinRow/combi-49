import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";
import { Usuario } from "./usuario.module";

export class Viaje{
    id: number;
    fechaSalida: Date;
    fechaLlegada: Date;
    detalle: string;
    borradoLogico: number;  //activo
    chofer: Usuario;// | Number;
    vehiculo: Number | Vehiculo;
    ruta: Ruta;

    getVehiculo():Vehiculo{
        return this.vehiculo as Vehiculo;
    }
}