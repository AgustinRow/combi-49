import { Provincia } from "./provincia.module";

export class Ciudad{
    idCiudad: number;
    nombre: string;
    provincia: string; //Provincia; <- corregir en app-lista-ciudad
    borradoLogico: number;  //activo
}