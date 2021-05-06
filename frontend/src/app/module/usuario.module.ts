import { Pasaje } from "./pasaje.module";

export class Usuario{
    idUsuario: number;
    nombre: string;
    apellido: string;
    tipo: number;           //perfil 1-Administrador, 2-Chofer, 3-pasajero
    email: string;
    dni: number;
    usuario: string;        //username
    contrasenia: string;    //password
    borradoLogico: number;  //activo
    pasajes: Pasaje[];
}