import { Usuario } from "./usuario.module";
import { Pasaje } from "./pasaje.module";

export class Valoracion{
    id: number;
    puntuacion: number;
    detalle: String;
    pasajeId: number;
    usuario: Usuario
    habilitado: number;  //activo

    private _Pasaje: Pasaje;
    public get Pasaje() {
        return this._Pasaje;
    }
    public set Pasaje(p: Pasaje) {
        this._Pasaje = p;
        this.pasajeId = p.id;
    }
}