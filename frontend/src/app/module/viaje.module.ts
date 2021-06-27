import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";
import { Usuario } from "./usuario.module";
import { Valoracion } from "./valoracion.module";
import { isEmpty } from "rxjs/operators";

export class Viaje {
    id: number;
    nombre: string;
    fecha_salida: Date;
    //fecha_llegada: Date;
    hora: Date;
    detalle: string;
    habilitado: number;  //activo
    precio: number;
    rutaId: number;
    vehiculoId: number;
    choferId: number;
    Valoracion: Valoracion[];
    asientos_disponibles: number;

    private _Chofer: Usuario[];
    public get Chofer(): Usuario[] {
        return this._Chofer;
    }
    public set Chofer(c: Usuario[]) {
        this._Chofer = c;
        this.choferId = c[0].id;
    }

    private _Vehiculo: Vehiculo[];
    public get Vehiculo(): Vehiculo[] {
        return this._Vehiculo;
    }
    public set Vehiculo(v: Vehiculo[]) {
        this._Vehiculo = v;
        this.vehiculoId = v[0].id;
    }

    private _Ruta: Ruta;
    public get Ruta() {
        return this._Ruta;
    }
    public set Ruta(r: Ruta) {
        this._Ruta = r;
        this.rutaId = r.id;
    }

    public valoracionPromedio: number;
    
    public valoracionCompletada: number;

}