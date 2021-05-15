import { Ciudad } from "./ciudad.module";

export class Parada{
    id: number;
    nombre: string;
    direccion: string;
    ciudad: string; //Ciudad; <- Para corregir en app-parada
    borradoLogico: number;  //activo
}