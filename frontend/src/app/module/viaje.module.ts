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
    precio: number;
    //Chofer: Usuario;
    choferId: number;
    rutaId: number;
    vehiculoId: number;

    private _Vehiculo: Vehiculo;
 
    public get Vehiculo() {
        return this._Vehiculo;
    }

    public set Vehiculo(v: Vehiculo) {
        this._Vehiculo = v;
        this.vehiculoId = v.id;
    }

    private _Ruta: Ruta;
 
    public get Ruta() {
        return this._Ruta;
    }

    public set Ruta(r: Ruta) {
        this._Ruta = r;
        this.rutaId = r.id;
    }
}