import { Usuario } from "./usuario.module";

export class Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    patente: string;
    asientos: number;
    confort: string;
    habilitado: boolean;  //activo
    createdAt: Date;
    updatedAt: Date;
    Chofer: Usuario;
}