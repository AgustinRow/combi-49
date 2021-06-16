import { Usuario } from "./usuario.module";
import { Viaje } from "./viaje.module";

export class Valoracion{
    id: number;
    puntuacion: number;
    detalle: String;
    viaje: Viaje;
    usuario: Usuario
    habilitado: number;  //activo
}