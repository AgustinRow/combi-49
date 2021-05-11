import { Pasaje } from "./pasaje.module";

export class Usuario{
    id: number;
    nombre: string;
    apellido: string;
    tipo: number;           //perfil 1-Administrador, 2-Chofer, 3-pasajero
    email: string;
    dni: number;
    username: string;        //username
    password: string;    //password
    habilitado: boolean;  //activo
    pasajes: Pasaje[];
}