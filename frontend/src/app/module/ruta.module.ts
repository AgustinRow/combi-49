import { Ciudad } from "./ciudad.module";

export class Ruta{
    id: number;
    nombre: string;
    distancia: string;
    duracion: number;
    Origen: Ciudad;
    Destino: Ciudad;
    borradoLogico: number;  //activo
}