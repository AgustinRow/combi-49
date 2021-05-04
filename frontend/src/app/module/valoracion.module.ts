import { Usuario } from "./usuario.module";
import { Viaje } from "./viaje.module";

export class Valoracion{
    idValoracion: number;
    puntuacion: number;
    viaje: Viaje;
    usuario: Usuario
    borradoLogico: number;  //activo
}