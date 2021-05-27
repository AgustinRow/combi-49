import { Parada } from "./parada.module";

export class Ruta{
    id: number;
    nombre: string;
    distancia: string;
    origen: Parada;
    destino: Parada;
    borradoLogico: number;  //activo
}