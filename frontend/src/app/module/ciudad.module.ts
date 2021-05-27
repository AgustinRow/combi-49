import { Provincia } from "./provincia.module";

export class Ciudad{
    id: number;
    nombre: string;
    codigoPostal: number;
    provincia: Provincia;
    borradoLogico: boolean;  //activo
}