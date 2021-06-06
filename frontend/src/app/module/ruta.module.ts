import { Ciudad } from "./ciudad.module";

export class Ruta{
    id: number;
    nombre: string;
    distancia: string;
    duracion: number;
    origen: Ciudad;
    destino: Ciudad;
    borradoLogico: number;  //activo
}