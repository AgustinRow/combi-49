import { Parada } from "./parada.module";

export class Ruta{
    idRuta: number;
    nombre: string;
    distancia: string;
    origen: Parada;
    destino: Parada;
    borradoLogico: number;  //activo
}