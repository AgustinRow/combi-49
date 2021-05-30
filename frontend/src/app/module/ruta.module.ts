import { Ciudad } from "./ciudad.module";

export class Ruta{
    id: number;
    nombre: string;
    distancia: string;
    origen: Ciudad;
    destino: Ciudad;
    borradoLogico: number;  //activo
}