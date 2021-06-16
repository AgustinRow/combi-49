import { Vehiculo } from "./vehiculo.module";
import { Ruta } from "./ruta.module";
import { Usuario } from "./usuario.module";

export class Viaje{
    id: number;
    fecha_salida: Date;
    //fecha_llegada: Date;
    hora: Date;
    detalle: string;
    habilitado: number;  //activo
    precio: number;
    rutaId: number;
    vehiculoId: number;
    choferId: number;

    private _Chofer: Usuario[];
    public get Chofer(): Usuario[] {
        return this._Chofer;
    }
    public set Chofer(c: Usuario[]) {
        this._Chofer = c;
        this.vehiculoId = c[0].id;
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
}