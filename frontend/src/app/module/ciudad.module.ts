import { Provincia } from "./provincia.module";

export class Ciudad{
    id: number;
    nombre: string;
    cp: number;
    Provincia: Provincia;
    habilitado: boolean;  //activo
}