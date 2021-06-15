import { Usuario } from "./usuario.module";
import { Test } from "./test.module";
import { Vianda } from "./vianda.module";
import { Viaje } from "./viaje.module";
import { Estado } from "./estado.module";

export class Pasaje{
    id: number;
    Estado: Estado;
    precio: number;
    Vianda: Vianda[];
    viajeId: number;
    test: Test;
    habilitado: number;  //activo
    pasajero: number
    
    private _Usuario: Usuario;
    public get Pasajero(): Usuario {
        return this._Usuario;
    }
    public set Pasajero(u: Usuario) {
        this._Usuario = u;
        this.pasajero = u.id;
    }
    
    private _Viaje: Viaje;
    public get Viaje(): Viaje {
        return this._Viaje;
    }
    public set Viaje(v: Viaje) {
        this._Viaje = v;
        this.viajeId = v.id;
    }
}