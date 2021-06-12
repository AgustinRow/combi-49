import { Provincia } from "./provincia.module";

export class Ciudad{
    id: number;
    nombre: string;
    cp: number;
    Provincia: Provincia;
    borradoLogico: boolean;  //activo
}