import { Usuario } from "./usuario.module";
import { Test } from "./test.module";
import { Vianda } from "./vianda.module";
import { Viaje } from "./viaje.module";

export class Pasaje{
    id: number;
    total: number;
    viandas: Vianda[];
    Viaje: Viaje;
    usuario: Usuario;
    test: Test;
    borradoLogico: number;  //activo
}