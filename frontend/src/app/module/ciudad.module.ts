import { Provincia } from "./provincia.module";

export class Ciudad{
    idCiudad: number;
    nombre: string;
    provincia: Provincia;
    borradoLogico: number;  //activo
}