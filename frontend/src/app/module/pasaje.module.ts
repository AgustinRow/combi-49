import { Usuario } from "./usuario.module";
import { Test } from "./test.module";
import { Vianda } from "./vianda.module";
import { Viaje } from "./viaje.module";

export class Pasaje{
    id: number;
    total: number;
    viandas: Vianda[];
    viaje: number;
    //usuario: Usuario;
    test: Test;
    habilitado: number;  //activo
    pasajero: number
    
    private _Usuario: Usuario;
    public get Usuario(): Usuario {
        return this._Usuario;
    }
    public set Usuario(u: Usuario) {
        this._Usuario = u;
        this.pasajero = u.id;
    }
    
    private _Viaje: Viaje;
    public get Viaje(): Viaje {
        return this._Viaje;
    }
    public set Viaje(v: Viaje) {
        this._Viaje = v;
        this.viaje = v.id;
    }
}