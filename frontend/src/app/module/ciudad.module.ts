import { Provincia } from "./provincia.module";

export class Ciudad{
    id: number;
    nombre: string;
    cp: number;
    provincia: Provincia;
    borradoLogico: boolean;  //activo
}