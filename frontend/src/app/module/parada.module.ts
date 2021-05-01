import { Ciudad } from "./ciudad.module";

export class Parada{
    idParada: number;
    nombre: string;
    direccion: string;
    ciudad: Ciudad;
    borradoLogico: number;  //activo
}