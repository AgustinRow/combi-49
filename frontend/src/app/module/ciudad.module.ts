import { Provincia } from "./provincia.module";

export class Ciudad{
    id: number;
    nombre: string;
    provincia: string; //Provincia; <- corregir en app-lista-ciudad
    borradoLogico: number;  //activo
}