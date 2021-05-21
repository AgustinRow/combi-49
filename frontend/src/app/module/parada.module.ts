import { Ciudad } from "./ciudad.module";

export class Parada{
    id: number;
    nombre: string;
    direccion: string;
    ciudad: Ciudad;
    borradoLogico: number;  //activo
}