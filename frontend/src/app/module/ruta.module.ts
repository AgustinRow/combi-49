import { Parada } from "./parada.module";

export class Ruta{
    id: number;
    nombre: string;
    distancia: string;
    origen: string; //Parada; <- Para corregir en app-ruta
    destino: string; //Parada; <- Para corregir en app-ruta
    borradoLogico: number;  //activo
}