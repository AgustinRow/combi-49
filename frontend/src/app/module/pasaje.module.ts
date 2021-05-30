import { Usuario } from "./usuario.module";
import { Test } from "./test.module";
import { Vianda } from "./vianda.module";

export class Pasaje{
    idPasaje: number;
    precio: number;
    borradoLogico: number;  //activo
    viandas: Vianda[];
    usuario: Usuario;
    test: Test;
}